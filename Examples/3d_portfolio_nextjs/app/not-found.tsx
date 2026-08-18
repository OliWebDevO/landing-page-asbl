import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-th-muted mb-8">Page not found</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Return home
      </Link>
    </div>
  )
}
