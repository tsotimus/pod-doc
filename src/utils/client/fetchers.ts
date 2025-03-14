import { ApiResponse } from "@/types/api";
import axios from "axios";

export const genericFetcher = (url: string) => axios.get<ApiResponse<never>>(url).then(res => res.data)