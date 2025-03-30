import React, { useState, useEffect } from 'react'
import { Rnd } from 'react-rnd'

const Designation = ({ designationInfo }) => {
	const { infoArr, background, name, designation, company } = designationInfo

	// Initial position and size
	const [position, setPosition] = useState({ x: 1000, y: 745 })
	const [size, setSize] = useState({ width: 250, height: 120 })
	const [isSelected, setIsSelected] = useState(false)
	const [isEditing, setIsEditing] = useState(false)

	// Editable text states
	const [editableName, setEditableName] = useState(name || 'Your Name')
	const [editableDesignation, setEditableDesignation] = useState(
		designation || 'Your Designation',
	)
	const [editableCompany, setEditableCompany] = useState(
		company || 'Your Company Name',
	)

	// Click outside to remove selection
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (!event.target.closest('.designation-box')) {
				setIsSelected(false)
				setIsEditing(false)
			}
		}

		document.addEventListener('click', handleClickOutside)
		return () => document.removeEventListener('click', handleClickOutside)
	}, [])

	// Font size calculation (minimum 16px for readability)
	const dynamicFontSize = Math.max(20, Math.min(size.width, size.height) * 0.1)
	return (
		<Rnd
			className={`designation-box absolute text-lg flex flex-col rounded-2xl justify-center items-center text-center
        ${infoArr[background.index]} ${
				isSelected ? 'border-2 border-blue-500 p-2' : 'border-none'
			}`}
			size={{ width: size.width, height: size.height }}
			position={{ x: position.x, y: position.y }}
			onDragStart={() => setIsSelected(true)}
			onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
			onResizeStart={() => setIsSelected(true)}
			onResizeStop={(e, direction, ref, delta, pos) => {
				setSize({ width: ref.offsetWidth, height: ref.offsetHeight })
				setPosition(pos)
			}}
			onMouseDown={() => setIsSelected(true)}
			style={{
				wordWrap: 'break-word',
				fontSize: `${dynamicFontSize}px`,
				cursor: isEditing ? 'text' : 'move',
			}}
		>
			{isEditing ? (
				<div className='w-full'>
					<input
						type='text'
						value={editableName}
						onChange={(e) => setEditableName(e.target.value)}
						className='w-full bg-transparent border-none text-center italic outline-none'
						style={{ fontSize: `${dynamicFontSize}px` }}
						autoFocus
					/>
					<input
						type='text'
						value={editableDesignation}
						onChange={(e) => setEditableDesignation(e.target.value)}
						className='w-full bg-transparent border-none text-center font-semibold outline-none'
						style={{ fontSize: `${dynamicFontSize}px` }}
					/>
					<input
						type='text'
						value={editableCompany}
						onChange={(e) => setEditableCompany(e.target.value)}
						className='w-full bg-transparent border-none text-center outline-none'
						style={{ fontSize: `${dynamicFontSize}px` }}
					/>
				</div>
			) : (
				<div onDoubleClick={() => setIsEditing(true)}>
					<h3 className='italic'>{editableName}</h3>
					<p className='font-semibold'>{editableDesignation}</p>
					<h4>{editableCompany}</h4>
				</div>
			)}
		</Rnd>
	)
}

export default Designation
