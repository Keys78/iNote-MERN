import TextInput from '@components/shared/TextInput'
import { Formik, FieldArray, Form } from 'formik'
import * as Yup from 'yup'
import React, { useEffect } from 'react'
import Button from '@components/shared/Button'
import StatustDropdown from '@components/shared/StatustDropdown'
import TextArea from '@components/shared/TextArea'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { RootState } from 'app/store'
import { useState } from 'react'
import { addTask, editTask } from '../../../features/board/boardSlice'
import Select from './Select'
import { Task } from '@src/types'

interface Props {
    task: Task,
    setShowUpdateBoardModal: React.Dispatch<React.SetStateAction<boolean>>
    setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const AddNewTaskModal = ({task, setShowUpdateBoardModal, setShowMenu}: Props) => {
    const dispatch = useAppDispatch()

    const validate = Yup.object({
        name: Yup.string().required("required"),
        subtasks: Yup.array().of(
            Yup.string().required("required"),
        )
    })



    const boards = useAppSelector((state: RootState) => state.boards.boards)
    const currentBoard = useAppSelector((state: RootState) => state.currentBoard.value)
    const boardNameTag = boards[currentBoard] && boards[currentBoard].name
    const boardColumnsx = boards?.find(element => element.name === boardNameTag)?.columns;

    console.log('ts', task.subtasks)


    // const [status, setStatus] = useState(boardColumnsx && boardColumnsx[0].name);
    const [status, setStatus] = useState('');



    return (
        <div>
            <h1 className="text-lg font-bold mb-6">Edit Task</h1>
            <Formik
                initialValues={{

                    task: {
                        title:task.title ,
                        description: task.description,
                        subtasks:task.subtasks,
                        status:'',
                    },
                    boardName: boardNameTag,
                    prevTaskTitle: task.title,
                    columnName:task.status

                }}
                // validationSchema={validate}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)

                    //make async call
                    values.columnName = values.task.status
                    dispatch(editTask(values))
                    setSubmitting(false)
                    setShowUpdateBoardModal(false)
                    setShowMenu(false)
                }}
            >
                {({ values, isSubmitting, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <TextInput label='Title' name={'task.title'} type="input" placeholder='eg: Take Coffee Break' />
                        <TextArea label="Description" name={'task.description'} type="text" placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little." />

                        <label className="body-md text-sm font-bold capitalize text-mediumGrey dark:text-white mt-6 block">
                            subtasks
                        </label>

                        <FieldArray name="task.subtasks"
                            render={arrayHelpers => (
                                <div>
                                    {values.task.subtasks.map((_, i) => (
                                        <div key={i} className="flex">
                                            <TextInput label='' name={`task.subtasks.${i}.title`} type="text" placeholder="e.g. Archived" />

                                            <button onClick={() => arrayHelpers.remove(i)}
                                                className="text-mediumGrey hover:text-mainRed ml-4"
                                            >
                                                <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
                                                    <g fill="currentColor" fillRule="evenodd">
                                                        <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                                                        <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                                                    </g>
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                    <br />

                                    <button
                                        type='button'
                                        onClick={() => arrayHelpers.push({ title: "", isCompleted: false })}
                                        className={'bg-[#635FC71A] rounded-full w-full py-[7px] text-mainPurple transition duration-200 text-base hover:bg-mainPurpleHover font-sans'}
                                    >
                                        {'+ Add New Subtask'}
                                    </button>
                                </div>
                            )}
                        />

                        <StatustDropdown currentStatus={task.status} boardColumns={boardColumnsx} status={status}  setStatus={setStatus}/> <br /> <br />

                        <Button type="submit" disabled={isSubmitting} children={'Save Changes'} width={"w-full"} padding={'py-[7px]'} color={'text-white'} />
                        {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AddNewTaskModal;