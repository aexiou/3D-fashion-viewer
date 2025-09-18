export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main style={{ maxWidth: 880, margin: "2rem auto", padding: 16 }}>
          <h1>3D Fashion Viewer – Dashboard (starter)</h1>
          {children}
        </main>
      </body>
    </html>
  )
}
