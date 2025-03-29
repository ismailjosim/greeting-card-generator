import React, { useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import bg01 from '../../assets/bg-01.png'
import bg02 from '../../assets/bg-02.png'
import bg03 from '../../assets/bg-03.png'
import bg04 from '../../assets/bg-05.png'
import bg05 from '../../assets/bg-06.png'
import bg06 from '../../assets/bg-07.png'
import bg08 from '../../assets/bg-10.png'
import bg09 from '../../assets/bg-11.png'
import { Button } from 'flowbite-react'
import FormModal from './Modal'
import { HiOutlineArrowRight } from 'react-icons/hi'
import Designs from './Designs'
const Certificate = () => {
	const customMessage =
		'Eid Mubarak! 🌙✨ May this blessed occasion bring you joy, peace, and prosperity. May your heart be filled with love, your home with happiness, and your life with endless blessings. Wishing you and your loved ones a wonderful Eid filled with laughter, togetherness, and gratitude. Stay blessed! 🤲💖'
	const [name, setName] = useState('')
	const [designation, setDesignation] = useState('')
	const [company, setCompany] = useState('')
	const [message, setMessage] = useState('')
	const [openModal, setOpenModal] = useState(false)

	const handleModal = () => {
		setName('')
		setDesignation('')
		setCompany('')
		setMessage('')
		setOpenModal(true)
	}

	const elementRef = useRef(null)

	const htmlToImageConvert = () => {
		toPng(elementRef.current, { cacheBust: false })
			.then((dataUrl) => {
				const link = document.createElement('a')
				link.download = 'my-image-name.png'
				link.href = dataUrl
				link.click()
			})
			.catch((err) => {
				console.log(err)
			})
	}

	const formInfo = {
		name,
		setName,
		designation,
		setDesignation,
		company,
		setCompany,
		message,
		setMessage,
		openModal,
		setOpenModal,
	}
	const bgArr = [bg01, bg02, bg03, bg04, bg05, bg06, bg08, bg09]
	const [changeBg, setChangeBg] = useState(bg01)
	const [activeBg, setActiveBg] = useState(0)

	const handleBg = (bg, index) => {
		setChangeBg(bg)
		setActiveBg(index)
	}

	const cardClasses = [
		'right-20 flex-col items-end bottom-72 [&>p]:text-2xl [&>p]:text-right [&>p]:w-1/2 [&>p]:text-wrap',
		'top-80 justify-center [&>p]:text-lg [&>p]:text-center [&>p]:w-1/2 [&>p]:text-wrap',
		'bottom-44 justify-center [&>p]:text-center [&>p]:w-1/2 [&>p]:text-wrap [&>p]:ml-20',
		'top-2/5 left-20 [&>p]:px-4 [&>p]:pl-8 text-justify [&>p]:w-1/3',
		'bottom-28 text-justify [&>p]:mx-auto [&>p]:w-3/5',
		'bottom-60 text-center text-white [&>p]:mx-auto [&>p]:w-3/5',
		'bottom-60 text-center [&>p]:mx-auto [&>p]:w-3/5',
		'bottom-20 text-center [&>p]:mx-auto [&>p]:w-3/5',
	]

	return (
		<section className='w-11/12 mx-auto grid grid-cols-10 gap-5'>
			<div className=' col-span-2 pt-10'>
				<Designs bgArr={bgArr} handleBg={handleBg} />
			</div>
			<div className='col-span-8'>
				<div className='items-center flex justify-between py-5'>
					<Button color={'green'} onClick={handleModal}>
						Generate Your Card
					</Button>
					<Button
						color={'green'}
						className='flex gap-1 uppercase'
						onClick={htmlToImageConvert}
					>
						<span>Download</span>
						<HiOutlineArrowRight className='h-6 w-6' />
					</Button>
				</div>

				<div
					ref={elementRef}
					className='relative h-[90vh] bg-center bg-no-repeat bg-cover rounded-md'
					style={{
						backgroundImage: `url(${changeBg})`,
					}}
				>
					<div
						className={`absolute flex w-full [&>p]:text-xl [&>p]:italic [&>p]:font-medium [&>p]:leading-10 ${cardClasses[activeBg]}`}
					>
						<p>{message ? message : customMessage}</p>
					</div>
					<div
						className={`absolute bottom-6 right-24 text-lg text-right ${
							activeBg === 1 && 'hidden'
						}`}
					>
						<h3 className='italic'>{name ? name : 'Your Name'}</h3>
						<p className='font-semibold'>
							{designation ? designation : 'Your Designation'}
						</p>
						<p>{company ? company : 'Your Company Name'}</p>
					</div>
				</div>
				<FormModal formInfo={formInfo} />
			</div>
		</section>
	)
}

export default Certificate
