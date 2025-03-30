import Designation from './Designation'
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
	const designationInfo = { infoArr, background, name, designation, company }
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
			<Designation designationInfo={designationInfo} />
		</div>
	)
}

export default Canvas
