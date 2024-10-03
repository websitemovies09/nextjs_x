import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const caterogyApi = createApi({
  reducerPath: 'caterogyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }), 
  endpoints: (builder) => ({
    getCaterogys: builder.query({
      query: () => 'caterogys', 
    }),
  }),
});

// Step 2: Export the auto-generated hook for querying the data
export const { useGetCaterogysQuery  } = caterogyApi;