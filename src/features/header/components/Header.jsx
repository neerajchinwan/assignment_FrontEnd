import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='bg-slate-300 p-4'>
        <div className='max-w-screen-2xl sm:max-w-screen-xl mx-auto flex justify-between items-center'>
            <span className='uppercase text-lg sm:text-2xl font-semibold text-blue-900'>dataneuron task</span>
            <ul className='flex gap-2 sm:gap-6'>
                <Link to='/'>
                    <li className='uppercase font-semibold text-blue-700 hover:text-blue-500'>Home</li>
                </Link>
                <Link to='/task-one'>
                    <li className='uppercase font-semibold text-blue-700 hover:text-blue-500'>Task One</li>
                </Link>
            </ul>
        </div>
    </header>
  )
}
