import React, { useState, useEffect } from 'react'
import { Rnd } from 'react-rnd'

const MessageBox = ({ message, customMessage }) => {
	const [position, setPosition] = useState({ x: 700, y: -300 })
	const [size, setSize] = useState({ width: 650, height: 250 })
	const [isSelected, setIsSelected] = useState(false)
	const [editableMessage, setEditableMessage] = useState(
		message || customMessage,
	)

	useEffect(() => {
		// Click outside to remove selection
		const handleClickOutside = (event) => {
			if (!event.target.closest('.message-box')) {
				setIsSelected(false)
			}
		}

		document.addEventListener('click', handleClickOutside)
		return () => document.removeEventListener('click', handleClickOutside)
	}, [])

	const handleTextChange = (e) => {
		setEditableMessage(e.target.value)
	}

	// Ensure a minimum font size of 20px
	const dynamicFontSize = Math.max(20, Math.min(size.width, size.height) * 0.1)

	return (
		<Rnd
			className={`message-box w-full h-full flex justify-center items-center text-center
        overflow-hidden whitespace-normal leading-[1.2]
        ${
					isSelected
						? 'border-2 border-blue-500 rounded-2xl p-2 cursor-move'
						: 'border-none cursor-default'
				}`}
			size={{ width: size.width, height: size.height }}
			position={{ x: position.x, y: position.y }}
			onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
			onResizeStop={(e, direction, ref, delta, pos) => {
				setSize({ width: ref.offsetWidth, height: ref.offsetHeight })
				setPosition(pos)
			}}
			onClick={() => setIsSelected(true)}
			style={{
				wordWrap: 'break-word',
				fontSize: `${dynamicFontSize}px`,
			}}
		>
			<div
				className='w-full h-full flex justify-center items-center'
				style={{ fontSize: `${dynamicFontSize}px` }}
			>
				{isSelected ? (
					<textarea
						value={editableMessage}
						onChange={handleTextChange}
						className='w-full h-full bg-transparent border-none resize-none'
						style={{
							fontSize: `${dynamicFontSize}px`,
							outline: 'none',
						}}
					/>
				) : (
					editableMessage
				)}
			</div>
		</Rnd>
	)
}

export default MessageBox
