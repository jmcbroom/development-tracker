// pages/404.js
import Link from 'next/link'

export default function Custom404() {
  return (
    <div className="max-w-xl mx-auto">
      <h2>Sorry, we couldn&apos;t find that page!</h2>
      <p className="text-lg my-8">Instead, maybe you can..</p>
      <ul className="list-disc list-inside text-lg">
        <li>Go to the <Link href="/map">map</Link></li>
        <li>Go to the <Link href="/projects">projects page</Link></li>
        <li><Link href="/submit-a-tip">Tell us</Link> about a project we don&apos;t know about!</li>
      </ul>
    </div>    
  )

}
