import axios, { AxiosRequestHeaders } from "axios";
import { useCallback, useState } from "react";

export enum method {
  get = "get",
  put = "put",
  post = "post",
  patch = "patch",
  delete = "delete",
}

export const useApi = (baseUrl: string) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const fetchData = useCallback(
    async (
      path: string,
      method: method,
      body?: unknown,
      headers?: AxiosRequestHeaders
    ) => {
      setLoading(true);
      try {
        const res = await axios[method](baseUrl + path, {
          data: body,
          headers: headers,
        });
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Something went wrong");
        }
        setLoading(false);
        return res;
      } catch (e) {
        setError(true);
        setLoading(false);
      }
    },
    [baseUrl]
  );
  return { fetchData, error, loading };
};





// import axios, { AxiosRequestHeaders } from "axios";
// import { useCallback, useState } from "react";

// export enum method {
//   get = "get",
//   put = "put",
//   post = "post",
//   patch = "patch",
//   delete = "delete",
// }

// export const useApi = (baseUrl: string) => {
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const fetchData = useCallback (
//     async (
//       path: string,
//       method: method,
//       body?: unknown,
//       headers?: AxiosRequestHeaders,
//     ) => {
//       setLoading(true);
//       try {
//         const res = await axios[method](baseUrl + path, {
//           data: body,
//           headers: headers,
//         });
//         if (res.status !== 200 && res.status !== 201) {
//         setError(true)
//           throw new Error("Something went wrong");
//         }
//         setLoading(false)
//       }
//     },
//     [baseUrl]
//   );
//   return { fetchData, error, loading };
// };