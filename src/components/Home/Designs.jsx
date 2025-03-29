import React from 'react'

const Designs = ({ bgArr, handleBg }) => {
	return (
		<section className='grid grid-cols-2 gap-5'>
			{bgArr.map((item, index) => (
				<button
					key={index}
					onClick={() => handleBg(item, index)}
					className='w-32 h-32 rounded-md hover:scale-110 transition-all ease-in-out duration-500 shadow-lg overflow-hidden object-fill cursor-pointer'
				>
					<img className='w-full h-full object-fill' src={item} alt='' />
				</button>
			))}
		</section>
	)
}

export default Designs
