import { searchAtom } from "@/helper/atom/search";
import { useAtom } from "jotai";


export default function Search() { 

    const [search, setSearch] = useAtom(searchAtom);

    return(
        <div className="  " >

        </div>
    )
}