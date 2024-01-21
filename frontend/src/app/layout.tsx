'use client';

import {Inter} from 'next/font/google';
import './globals.css';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {CssBaseline} from '@mui/material';
import {Container} from '@mui/material';

const inter = Inter({subsets: ['latin']});
const queryClient = new QueryClient();


export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {

  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline/>
      <html lang="en">
      <body className={inter.className}>
      <main>
        <Container maxWidth="xl">
          {children}
        </Container>
      </main>
      </body>
      </html>
    </QueryClientProvider>

  );
}
