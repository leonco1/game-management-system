import {createQueryPreloader, useApolloClient} from '@apollo/client'

export default preloadQuery=createQueryPreloader(useApolloClient())