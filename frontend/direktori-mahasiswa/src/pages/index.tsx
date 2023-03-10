import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import logoUSU from "../../public/images/logo-usu.webp";

interface studentProp {
	id: string,
	nim: string,
	email: string,
	name: string,
	address: {
		country: string,
		city: string,
		postCode: string
	},
	favouriteSubjects: string[],
}

export default function Home() {
	const [students, setStudents] = useState<studentProp[]>([]);
	const [searchStudentResult, setSearchStudentResult] = useState<studentProp[]>([]);
	const [searchInput, setSearchInput] = useState('');

	useEffect(() => {
		axios.get('http://localhost:8080/api/v1/students')
			.then(response => {
				const result = response.data;
				setStudents(result);
			});
	}, [students]);

	const onSearchHandler = async (event: any) => {
		event.preventDefault();
		
		const value: string = event.target.elements[0].value;
		setSearchInput(value);
		
		if (value.length == 9) {
			axios.get(`http://localhost:8080/api/v1/students/nim/${value}`)
				.then(response => {
					const result = response.data;
					setSearchStudentResult(result);
				});
		} 
	}

	const onDeleteHandler = async (id: string) => {
		axios.delete(`http://localhost:8080/api/v1/students/${id}`)
			.then(() => {
				alert(`Mahasiswa dengan id ${id} berhasil dihapus`);
			});
    }
	
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="author" content="Muhammad Arief Fadhlan" />
				<meta name="description" content="Direktori Mahasiswa" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<header className='px-8 pt-4'>
				<Image src={logoUSU} alt="Universitas Sumatera Utara" className='w-10 h-10' />
			</header>
			<section className='flex flex-col justify-center items-center gap-6 py-16'>
				<hgroup className='flex flex-col justify-center items-center gap-5'>
					<h1 className='font-heading font-bold text-6xl'>Direktori Mahasiswa</h1>
					<h2 className='font-body font-medium text-xl'>Kumpulan data mahasiswa Universitas Sumatera Utara</h2>
				</hgroup>
				<div className='flex justify-center items-center gap-4 w-full'>
					<form onSubmit={onSearchHandler} className="flex items-center gap-4 max-w-sm w-full">
						<input type="text" placeholder="Masukkan NIM" className='placeholder:text-slate-600 w-full h-10 px-3 py-3 shadow-sm rounded-lg border-[1.5px] border-slate-700 bg-white text-base text-slate-900 transition duration-[0.2s] ease-[cubic-bezier(.4,0,1,1)]focus:border-indigo-500 focus:outline-none' />
						<button className='flex justify-center items-center gap-1 px-4 py-2 rounded-lg bg-indigo-600 font-medium text-base text-white transition ease-in-out duration-150 hocus:ring-2 hocus:ring-offset-2 hocus:ring-indigo-600 hocus:ring-offset-slate-900 focus:outline-none active:bg-indigo-700'>
							Cari
						</button>
					</form>
					<Link href={'/student/create'}>
						<button className='flex justify-center items-center gap-1 px-4 py-2 rounded-lg bg-slate-600 font-medium text-base text-white transition ease-in-out duration-150 hocus:ring-2 hocus:ring-offset-2 hocus:ring-slate-600 hocus:ring-offset-slate-900 focus:outline-none active:bg-slate-700'>
							Tambah mahasiswa baru
						</button>
					</Link>
				</div>
				<div className='flex justify-center items-center gap-10 w-full'>
					{searchInput.length > 1 ? (
						searchStudentResult.map((student: any) => {
							return (
								<div key={student.id} className="flex flex-col gap-6 max-w-sm w-fit rounded-lg p-5 bg-slate-200">
									<div className='flex gap-10'>
										<div className='flex flex-col gap-3'>
											<div>NIM</div>
											<div>Email</div>
											<div>Nama</div>
											<div>Asal Kota</div>
											<div>Pelajaran</div>
										</div>
										<div className='flex flex-col gap-3'>
											<div>: {student.nim}</div>
											<div>: {student.email}</div>
											<div>: {student.name}</div>
											<div>: {student.address.city}</div>
											<div className='flex gap-1'>:
												<div className='flex flex-col'>
													{student.favouriteSubjects.map((favouriteSubject: any, index: any) => (
														<div className='w-full' key={index}>- {favouriteSubject}</div>
													))}
												</div>
											</div>
										</div>
									</div>
									<div className='flex gap-2 w-full'>
										<Link href={`/student/edit/${student.id}`} className="w-full">
											<button className='flex justify-center items-center gap-1 w-full px-4 py-2 rounded-lg bg-blue-600 font-medium text-base text-white transition ease-in-out duration-150 hocus:ring-2 hocus:ring-offset-2 hocus:ring-blue-600 hocus:ring-offset-blue-900 focus:outline-none active:bg-blue-700'>
												Edit
											</button>
										</Link>
										<button onClick={() => onDeleteHandler(student.id)} className='flex justify-center items-center gap-1 w-full px-4 py-2 rounded-lg bg-red-600 font-medium text-base text-white transition ease-in-out duration-150 hocus:ring-2 hocus:ring-offset-2 hocus:ring-red-600 hocus:ring-offset-red-900 focus:outline-none active:bg-red-700'>
											Hapus
										</button>
									</div>
								</div>
							)
						})
					) : (
						students.map((student: any) => {
							return (
								<div key={student.id} className="flex flex-col gap-6 max-w-sm w-fit rounded-lg p-5 bg-slate-200">
									<div className='flex gap-10'>
										<div className='flex flex-col gap-3'>
											<div>NIM</div>
											<div>Email</div>
											<div>Nama</div>
											<div>Asal Kota</div>
											<div>Pelajaran</div>
										</div>
										<div className='flex flex-col gap-3'>
											<div>: {student.nim}</div>
											<div>: {student.email}</div>
											<div>: {student.name}</div>
											<div>: {student.address.city}</div>
											<div className='flex gap-1'>:
												<div className='flex flex-col'>
													{student.favouriteSubjects.map((favouriteSubject: any, index: any) => (
														<div className='w-full' key={index}>- {favouriteSubject}</div>
													))}
												</div>
											</div>
										</div>
									</div>
									<div className='flex gap-2 w-full'>
										<Link href={`/student/edit/${student.id}`} className="w-full">
											<button className='flex justify-center items-center gap-1 w-full px-4 py-2 rounded-lg bg-blue-600 font-medium text-base text-white transition ease-in-out duration-150 hocus:ring-2 hocus:ring-offset-2 hocus:ring-blue-600 hocus:ring-offset-blue-900 focus:outline-none active:bg-blue-700'>
												Edit
											</button>
										</Link>
										<button onClick={() => onDeleteHandler(student.id)} className='flex justify-center items-center gap-1 w-full px-4 py-2 rounded-lg bg-red-600 font-medium text-base text-white transition ease-in-out duration-150 hocus:ring-2 hocus:ring-offset-2 hocus:ring-red-600 hocus:ring-offset-red-900 focus:outline-none active:bg-red-700'>
											Hapus
										</button>
									</div>
								</div>
							)
						})
					)}
				</div>
			</section>
		</>
    )
}
