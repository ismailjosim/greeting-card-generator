import React, { useState, useEffect } from 'react'
import { Rnd } from 'react-rnd'
import { X } from 'lucide-react' // Import close icon from Lucide

const Designation = ({ designationInfo }) => {
	const { infoArr, background, name, designation, company } = designationInfo

	// State for position, size, selection, and visibility
	const [position, setPosition] = useState({ x: 1000, y: 745 })
	const [size, setSize] = useState({ width: 250, height: 120 })
	const [isSelected, setIsSelected] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const [isVisible, setIsVisible] = useState(true) // Track visibility

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

	// Hide component when remove button is clicked
	const handleRemove = () => {
		setIsVisible(false)
	}

	// Font size calculation (minimum 20px for readability)
	const dynamicFontSize = Math.max(20, Math.min(size.width, size.height) * 0.1)

	if (!isVisible) return null // Don't render if hidden

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
			{/* Remove Button (Visible when selected) */}
			{isSelected && (
				<button
					onClick={handleRemove}
					className='absolute -top-5 -right-3 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-700 transition'
				>
					<X size={20} />
				</button>
			)}

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
