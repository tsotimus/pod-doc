import { ApiResponse } from "@/types/api";
import { PodDisplay } from "@/types/pod";
import { genericFetcher } from "@/utils/client/fetchers";
import { AxiosError } from "axios";
import useSWR from "swr";


interface UsePodsProps {
    fallbackData?: ApiResponse<PodDisplay[]>
}
export const usePods = ({fallbackData}: UsePodsProps = {}) => {
    const {data, error, isLoading} = useSWR<ApiResponse<PodDisplay[]>, AxiosError>(
        "/api/v1/pods", 
        genericFetcher, 
        {
            fallbackData
        }
    )

    return {
        pods: data?.data ?? [],
        isLoading,
        error
    }
}
