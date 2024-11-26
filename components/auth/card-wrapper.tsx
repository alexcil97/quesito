"use client"

import { Social } from "@/components/social"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Header } from "./header"
import { BackButton } from "../back-button"

interface CardWrapperProps {
    children: React.ReactNode
    headerLabel: string
    showSocial?: boolean
    backButtonLabel: string
    backButtonHref: string
}

export const CardWrapper = ({
    children,
    headerLabel,
    showSocial,
    backButtonLabel,
    backButtonHref
}: CardWrapperProps) => {
    return (
        <>
            {/* <Card className="w-[30%] sm:w-[50%] flex flex-col gap-y-4 items-center justify-center mt-[40%]"> */}
            <Card className="md:w-[500px] w-[300px] shadow-md border-0">
                <CardHeader>
                    <Header label={headerLabel} />
                </CardHeader>
                <CardContent className="p-2">
                    {children}
                </CardContent>
                {showSocial && (
                    <CardFooter className="place-content-center">
                        <Social />
                    </CardFooter>
                )}
                <CardFooter>
                    <BackButton
                        href={backButtonHref}
                        label={backButtonLabel}
                    />
                </CardFooter>
            </Card>
        </>
    )
}