import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";

export const useAppSelector = useSelector.withTypes<RootState>()