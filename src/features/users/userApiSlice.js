import { apiSlice } from "../../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        setMachine : builder.mutation({
            query : (data) => ({
                url : "user/setmachine",
                method : "POST",
                body : {...data}
            }) 
        }),
        getMachine : builder.query({
            query : () => ({
                url : "user/getmachine",
                method : "GET",
            }),
        })
        
    })
})

export const {
    useSetMachineMutation,
    useGetMachineQuery
} = userApiSlice