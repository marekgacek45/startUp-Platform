'use client'

import React, { useActionState, useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import MDEditor from '@uiw/react-md-editor'
import { Button } from './ui/button'
import { Send } from 'lucide-react'
import { formSchema } from '@/lib/validation'
import z from 'zod'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { createPitch } from '@/lib/actions'

const StartupForm = () => {
	const [errors, setErrors] = useState<Record<string, string>>({})
	const [pitch, setPitch] = useState('')
	const { toast } = useToast()

    const router = useRouter()

	const handleFormSubmit = async (prevState: any, formData: FormData) => {
		try {
			const formValues = {
				title: formData.get('title') as string,
				description: formData.get('description') as string,
				category: formData.get('category') as string,
				link: formData.get('link') as string,
				pitch,
			}
			await formSchema.parseAsync(formValues)


            
			const result = await createPitch(prevState,formData,pitch)
			console.log(result);
			if (result.status === 'SUCCESS') {
				toast({
					title: 'Success',
					description: 'your startup has been created succesfully',
					variant: 'destructive',
				})
                router.push(`/startup/${result._id}`)

			}

            return result

		} catch (error) {
			if (error instanceof z.ZodError) {
				const fieldErrors = error.flatten().fieldErrors

				setErrors(fieldErrors as unknown as Record<string, string>)

				toast({
					title: 'Error',
					description: 'Please check your inputs',
					variant: 'destructive',
				})

				return { ...prevState, error: 'Validation failed', status: 'ERROR' }
			}

			toast({
				title: 'Error',
				description: 'Something went wrong',
				variant: 'destructive',
			})

			return { ...prevState, error: 'Something went wrong', status: 'ERROR' }
		}
	}

	const [state, formAction, isPending] = useActionState(handleFormSubmit, { error: '', status: 'INITIAL' })

	return (
		<form action={formAction} className='startup-form'>
			<div>
				<label htmlFor='title' className='startup-form_label'>
					Title
				</label>
				<Input id='title' name='title' className='startup-form_input' placeholder='Startup Title' required />
				{errors.title && <p className='startup-form_error'>{errors.title}</p>}
			</div>

			<div>
				<label htmlFor='description' className='startup-form_label'>
					Description
				</label>
				<Textarea
					id='description'
					name='description'
					required
					className='startup-form_textarea'
					placeholder='Startup Description'
				/>
				{errors.description && <p className='startup-form_error'>{errors.description}</p>}
			</div>

			<div>
				<label htmlFor='category' className='startup-form_label'>
					Category
				</label>
				<Input
					id='category'
					name='category'
					className='startup-form_input'
					required
					placeholder='Startup Category (Tech,Education,etc)'
				/>
				{errors.category && <p className='startup-form_error'>{errors.category}</p>}
			</div>

			<div>
				<label htmlFor='link' className='startup-form_label'>
					Image url
				</label>
				<Input id='link' name='link' className='startup-form_input' required placeholder='Startup Image URL' />

				{errors.link && <p className='startup-form_error'>{errors.link}</p>}
			</div>

			<div data-color-mode='light'>
				<label htmlFor='pitch' className='startup-form_label'>
					Pitch
				</label>
				<MDEditor
					value={pitch}
					onChange={value => setPitch(value as string)}
					id={pitch}
					preview='edit'
					height={300}
					style={{ borderRadius: 20, overflow: 'hidden' }}
					textareaProps={{
						placeholder: 'Describe your idea',
					}}
					previewOptions={{
						disallowedElements: ['style'],
					}}
				/>

				{errors.pitch && <p className='startup-form_error'>{errors.pitch}</p>}
			</div>

			<Button type='submit' className='startup-form_btn text-white' disabled={isPending}>
				{isPending ? 'Submitting...' : '  Submit your pitch'}
				<Send className='size-8 ml-2' />
			</Button>
		</form>
	)
}

export default StartupForm