import React, { useState, useRef } from 'react'
import Image from 'next/image';
import Modal from '@components/Modal';
import DeleteWarningModal from '@components/Modal/DeleteWarningModal';
import UpdateBoardModal from '@components/Modal/UpdateBoardModal';
import UpdateTaskModal from '@components/Modal/UpdateTaskModal';
import { useOnClickOutside } from 'usehooks-ts'
import { Task } from '@src/types';
import { taskCompleted } from '@reduxjs/toolkit/dist/listenerMiddleware/exceptions';


interface editButtonProps {
  task: Task
  className: string
  currentBoard: any
  type: string
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>
}

const EditButton = ({ type, task, setShowDetails, className, currentBoard }: editButtonProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showUpdateBoardModal, setShowUpdateBoardModal] = useState<boolean>(false);
  const [showDeleteBoardModal, setShowDeleteBoardModal] = useState<boolean>(false);

  const menuRef = useRef(null)

  const handleClickOutside = () => { setShowMenu(!showMenu) }
  useOnClickOutside(menuRef, handleClickOutside)

  return (
    <div className='relative'>
      <button className="h-8 w-8" onClick={() => setShowMenu(!showMenu)}>
        <Image src="/assets/icon-vertical-ellipsis.svg" alt="vertical ellipsis" height={16} width={4} />
      </button>
      {showMenu &&
    
        (type === "Board" ? 
          <div ref={menuRef} className={`${className} flex flex-col items-start space-y-4 absolute body-lg rounded-lg p-4 w-48 shadow-main capitalize bg-white dark:bg-veryDarkGrey`}
          >
            <>
              <button
                className="text-mediumGrey text-[13px]"
                onClick={() => setShowUpdateBoardModal(!showUpdateBoardModal)}
              >
                Edit board
              </button>
              <Modal showModal={showUpdateBoardModal} setShowModal={() => setShowUpdateBoardModal(!showUpdateBoardModal)}>
                <UpdateBoardModal setShowUpdateBoardModal={setShowUpdateBoardModal}/>
              </Modal>
              <button
                className="text-mainRed  text-[13px]"
                onClick={() => setShowDeleteBoardModal(true)}
              >Delete board
              </button>
              <Modal showModal={showDeleteBoardModal} setShowModal={() => setShowDeleteBoardModal(!showDeleteBoardModal)}>
                <DeleteWarningModal  setShowDetails={setShowDetails} currentTask={task} type='Board' currentBoard={currentBoard} setShowMenu={setShowMenu} setShowDeleteBoardModal={setShowDeleteBoardModal} />
              </Modal>
            </>
          </div>  : 
          // tasks CTA Modals
          <div ref={menuRef} className={`${className} flex flex-col items-start space-y-4 absolute body-lg rounded-lg p-4 w-48 shadow-main capitalize bg-white dark:bg-veryDarkGrey`}
          >
            <>
              <button
                className="text-mediumGrey text-[13px]"
                onClick={() => setShowUpdateBoardModal(!showUpdateBoardModal)}
              >
                Edit Task
              </button>
              <Modal showModal={showUpdateBoardModal} setShowModal={() => setShowUpdateBoardModal(!showUpdateBoardModal)}>
                <UpdateTaskModal task={task} setShowUpdateBoardModal={setShowUpdateBoardModal} setShowMenu={setShowMenu}/>
              </Modal>
              <button
                className="text-mainRed  text-[13px]"
                onClick={() => setShowDeleteBoardModal(true)}
              >Delete Task
              </button>
              <Modal showModal={showDeleteBoardModal} setShowModal={() => setShowDeleteBoardModal(!showDeleteBoardModal)}>
                <DeleteWarningModal currentTask={task} type='' setShowDetails={setShowDetails} currentBoard={currentBoard} setShowMenu={setShowMenu} setShowDeleteBoardModal={setShowDeleteBoardModal} />
              </Modal>
            </>
          </div>
        )
      }
    </div>

  )
}

export default EditButton;