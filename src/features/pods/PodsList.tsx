"use client"

import { PodDisplay } from "@/types/pod";
import Typography from "@/components/ui/typography";
import { Card, CardTitle, CardHeader } from "@/components/ui/card";
import { ApiResponse } from "@/types/api";
import {usePods} from "@/features/pods/usePods";
import { match, P } from "ts-pattern";
import { Spinner } from "@/components/ui/spinner";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trash } from "lucide-react";
import Link from "next/link";
interface PodsListProps {
    initialPods: ApiResponse<PodDisplay[]>
}

const PodsList = ({initialPods}: PodsListProps) => {
    const {pods, isLoading, error} = usePods({fallbackData: initialPods})
    return (
        <div>
            {match<{pods: PodDisplay[] | null, isLoading: boolean, error: AxiosError | string[] | undefined}>({pods, isLoading, error})
                .with({ isLoading: true }, () => {
                    return <Spinner/>
                })
                .with({ error: P.not(undefined), isLoading: false }, ({ error }) => {
                    const errorMessage = Array.isArray(error) 
                        ? error.join(', ') 
                        : error instanceof AxiosError 
                            ? error.message 
                            : JSON.stringify(error);
                    return <div>Error: {errorMessage}</div>
                })
                .with({ pods: P.when(pods => Array.isArray(pods) && pods.length === 0), isLoading: false }, () => {
                    return <Typography>No pods available. Create your first pod to get started!</Typography>
                })
                .with({ pods: P.array(), isLoading: false }, ({ pods }) => {
                    return (
                        <div className="flex flex-col gap-4 w-full">
                            {pods.map((pod) => (
                                <Card key={pod.id} className="p-2">
                                        <CardHeader className="flex flex-row justify-between items-center">
                                            <CardTitle>{pod.name}</CardTitle>
                                            <div className="flex flex-row gap-2">
                                                <Link href={`/pods/${pod.id}`}> 
                                                    <Button variant="ghost" size="icon" className="hover:text-white hover:bg-blue-500">
                                                        <ArrowRight className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Button variant="ghost" size="icon" className="hover:bg-red-500 hover:text-white">
                                                    <Trash className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </CardHeader>
                                </Card>
                            ))}
                        </div>
                    )
                })
                .otherwise(() => <div>No data available</div>)
            }
        </div>
    )
}

export default PodsList;