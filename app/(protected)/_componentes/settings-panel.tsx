import { changeUserValueValidation } from "@/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { userCurrentUser } from "../hook/use-current-user"
import { useTransition } from "react"
import { settings } from "@/actions/settings"
import { useSession } from "next-auth/react"
import {
    Form,
    FormControl,
    FormItem,
    FormLabel,
    FormField,
    FormMessage,
    FormDescription,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
export const SettingsPanel = () => {

    const user = userCurrentUser()
    const [isPending, startTransition] = useTransition()
    const { update } = useSession()

    const form = useForm<z.infer<typeof changeUserValueValidation>>({
        resolver: zodResolver(changeUserValueValidation),
        defaultValues: {
            nombre: user.session?.name || undefined,
            email: user.session?.email || undefined,
            apellido: user.session?.apellido || undefined,
            edad: user.session?.edad || undefined,
            profile_picture: user.session?.profile_picture || undefined,
            password: undefined,
            newPassword: undefined,
        }
    })

    const onSubmit = (values: z.infer<typeof changeUserValueValidation>) => {
        startTransition(() => {
            settings(values).then((data) => {
                if (data?.success) {
                    update()
                }
                if (data?.error) {
                    //TODO:: PENSAR QUE ERROR MOSTRAR
                }
            })
        })
        update()
    }
    return (
        <>
            <div className="my-3">
                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <h2 className="mb-3 font-semibold text-4xl">Cuenta de usuario</h2>
                        <div className="grid grid-cols-1 gap-4">
                            <FormField
                                control={form.control}
                                name="nombre"
                                render={({ field }) => (
                                    <FormItem className="text-xs w-auto">
                                        <FormLabel>Nombre</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="dark:border-slate-800 max-w-max"
                                                {...field}
                                                placeholder="Nombre"
                                                disabled={isPending}
                                                type="text"
                                                defaultValue={user.session?.nombre}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </form>
                </Form>
            </div>
        </>
    )
}