import React from 'react'
import './globals.css';

export const metadata = {
  title: 'UrbanRoots',
  description: 'UrbanRoots vise à encourager le jardinage urbain et favoriser la collaboration communautaire pour créer et entretenir des espaces verts.',

}

const layout = ({children}) => {
  return (
    <html>
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}

export default layout