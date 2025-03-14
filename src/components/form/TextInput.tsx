import { useFormContext, RegisterOptions } from "react-hook-form"
import { Input } from "../ui/input"
import { FormMessage } from "../ui/form"
import { FormDescription } from "../ui/form"
import { FormField, FormItem } from "../ui/form"
import { FormLabel } from "../ui/form"
import { FormControl } from "../ui/form"

interface TextInputProps {
    name: string
    label?: string
    placeholder?: string
    rules?: RegisterOptions
    defaultValue?: string
    description?: string
}

const TextInput = ({name, label, placeholder, rules, defaultValue, description}: TextInputProps) => {
    const {control} = useFormContext()
    return (
        <FormField
            control={control}
            name={name}
            rules={rules}
            defaultValue={defaultValue ?? ""}
            render={({field}) => (
            <FormItem className="flex flex-col gap-3">
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Input {...field} placeholder={placeholder} />
                </FormControl>
                {
                    description && (
                        <FormDescription>
                            {description}
                        </FormDescription>
                    )
                }
                <FormMessage />
            </FormItem>
            )}
        />
    )
}

export default TextInput;