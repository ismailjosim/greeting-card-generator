import MessageBox from './MessageBox'

const Canvas = ({ canvasInfo }) => {
	const {
		elementRef,
		background,
		cardClasses,
		message,
		customMessage,
		infoArr,
		designation,
		company,
	} = canvasInfo
	return (
		<div
			ref={elementRef}
			className='relative h-[90vh] bg-center bg-no-repeat bg-cover rounded-md'
			style={{
				backgroundImage: `url(${background.image})`,
			}}
		>
			<div
				className={`absolute flex w-full [&>p]:text-xl [&>p]:italic [&>p]:font-medium [&>p]:leading-10 ${
					cardClasses[background.index]
				}`}
			>
				<MessageBox message={message} customMessage={customMessage} />
			</div>
			<div
				className={`absolute text-lg [&>.personName]:italic [&>.personDesignation]:font-semibold ${
					infoArr[background.index]
				} `}
			>
				<h3 className='personName'>{name ? name : 'Your Name'}</h3>
				<p className='personDesignation'>
					{designation ? designation : 'Your Designation'}
				</p>
				<h4>{company ? company : 'Your Company Name'}</h4>
			</div>
		</div>
	)
}

export default Canvas
