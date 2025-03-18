import { Eye, EyeOff } from 'lucide-react'
import { forwardRef, useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { cn } from '~/lib/utils'

const PasswordInput = forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
	({ className, ...props }, ref) => {
		const [showPassword, setShowPassword] = useState(false)

		const togglePasswordVisibility = () => {
			setShowPassword(!showPassword)
		}

		return (
			<div className="relative">
				<Input
					name="password"
					type={showPassword ? 'text' : 'password'}
					className={cn('pr-10', className)}
					ref={ref}
					{...props}
				/>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
					onClick={togglePasswordVisibility}
				>
					{showPassword ? (
						<EyeOff className="h-4 w-4 text-muted-foreground" />
					) : (
						<Eye className="h-4 w-4 text-muted-foreground" />
					)}
					<span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
				</Button>
			</div>
		)
	}
)

PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
