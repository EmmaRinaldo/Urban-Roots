import React from 'react'
import './globals.css';
import Provider from '@/components/Provider';

export const metadata = {
  title: 'UrbanRoots',
  description: 'UrbanRoots vise à encourager le jardinage urbain et favoriser la collaboration communautaire pour créer et entretenir des espaces verts.',

}

const layout = ({ children }) => {
  return (
    <html>
      <body>
        <Provider>
          <main>
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default layout