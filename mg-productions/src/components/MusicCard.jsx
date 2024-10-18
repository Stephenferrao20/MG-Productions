import React from 'react'

export default function MusicCard() {
  return (
    <div>
      <div className="card bg-zinc-900 w-72 m-4 shadow-xl shadow-purple-950">
  <figure className="px-5 pt-5 pb-0 m-0">
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes"
      className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center text-gray-50 mt-1">
    <h2 className="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions  justify-end">
      <span className='ml-48'>views</span>
    </div>
  </div>
</div>
    </div>
  )
}
