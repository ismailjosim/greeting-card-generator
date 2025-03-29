import {
	Button,
	Label,
	Modal,
	ModalBody,
	ModalHeader,
	Textarea,
	TextInput,
} from 'flowbite-react'

const FormModal = ({ formInfo }) => {
	const {
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
	} = formInfo

	function onCloseModal() {
		setOpenModal(false)
	}

	return (
		<>
			<Modal show={openModal} size='lg' onClose={onCloseModal} popup>
				<ModalHeader />
				<ModalBody>
					<div className='space-y-4'>
						<h3 className='text-xl font-medium text-gray-900 dark:text-white'>
							Enter Information to Generate Your Card
						</h3>

						<div>
							<div className='mb-2 block'>
								<Label htmlFor='name'>Your Name</Label>
							</div>
							<TextInput
								id='name'
								placeholder='Enter Your Name'
								value={name}
								onChange={(event) => setName(event.target.value)}
								required
							/>
						</div>
						<div>
							<div className='mb-2 block'>
								<Label htmlFor='name'>Your Designation</Label>
							</div>
							<TextInput
								id='designation'
								placeholder='Enter Your Designation'
								value={designation}
								onChange={(event) => setDesignation(event.target.value)}
								required
							/>
						</div>
						<div>
							<div className='mb-2 block'>
								<Label htmlFor='name'>Your Company</Label>
							</div>
							<TextInput
								id='company'
								placeholder='Enter Your Company Name'
								value={company}
								onChange={(event) => setCompany(event.target.value)}
								required
							/>
						</div>
						<div>
							<div className='mb-2 block'>
								<Label htmlFor='name'>Your Message</Label>
							</div>
							<Textarea
								className='resize-none'
								placeholder={'Greeting Message within 50 character'}
								value={message}
								onChange={(event) => setMessage(event.target.value)}
								required
								rows={4}
								maxLength={200}
								minLength={20}
							/>
						</div>

						<div className='w-full flex justify-end'>
							<Button onClick={onCloseModal}>Done</Button>
						</div>
					</div>
				</ModalBody>
			</Modal>
		</>
	)
}
export default FormModal
