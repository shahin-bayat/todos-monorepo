import { withTRPC } from "@trpc/next"
import type { AppType } from "next/dist/shared/lib/utils"
import superjson from "superjson"
import type { AppRouter } from "server"
import "../styles/globals.css"

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return <Component {...pageProps} />
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = `http://localhost:8080/trpc`

    return {
      url,
      transformer: superjson,
    }
  },
  ssr: false,
})(MyApp)
