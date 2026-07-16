import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { RouterProvider } from 'react-router-dom'
import { theme } from './theme/theme'
import { GlobalStyle } from './theme/GlobalStyle'
import { router } from './routes'
import './index.css'
import './theme/fonts.ts'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <GlobalStyle/>

            <RouterProvider router={router}/>
        </ThemeProvider>
    </StrictMode>,
);
