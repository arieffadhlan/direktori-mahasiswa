import axios from 'axios';
import { useRouter } from 'next/router'

interface studentProp {
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

export default function create() {
    const router = useRouter();
    
    const onHandleSubmit = async (event: any) => {
        event.preventDefault();

        const student: studentProp = {
            nim: event.target.nim.value,
            email: event.target.email.value,
            name: event.target.name.value,
            address: {
                country: event.target.country.value,
                city: event.target.city.value,
                postCode: event.target.postCode.value
            },
            favouriteSubjects: [
                event.target.favouriteSubjects.value
            ]
        };

        const options = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        
        axios.post('http://localhost:8080/api/v1/students',JSON.stringify(student), options)
            .then(() => {
                alert(`Mahasiswa dengan nama ${student.name} berhasil dibuat`);
                router.push('/');
            });
    }
    
    return (
        <section className='flex flex-col justify-center items-center gap-6 py-16'>
            <hgroup className='flex flex-col justify-center items-center gap-5'>
                <h1 className='font-heading font-bold text-6xl'>Tambah Mahasiswa Baru</h1>
                <h2 className='font-body font-medium text-xl'>Lengkapi data berikut untuk menambahkan mahasiswa baru</h2>
            </hgroup>
            <div className='flex justify-center items-center gap-4 w-full'>
                <form onSubmit={onHandleSubmit} className="flex flex-col items-center gap-4 max-w-sm w-full">
                    <input type="text" id="nim" name="nim" placeholder="Masukkan NIM" className='placeholder:text-slate-600 w-full h-10 px-3 py-3 shadow-sm rounded-lg border-[1.5px] border-slate-700 bg-white text-base text-slate-900 transition duration-[0.2s] ease-[cubic-bezier(.4,0,1,1)]focus:border-indigo-500 focus:outline-none' />
                    <input type="email" id="email" name="email" placeholder="Masukkan email" className='placeholder:text-slate-600 w-full h-10 px-3 py-3 shadow-sm rounded-lg border-[1.5px] border-slate-700 bg-white text-base text-slate-900 transition duration-[0.2s] ease-[cubic-bezier(.4,0,1,1)]focus:border-indigo-500 focus:outline-none' />
                    <input type="text" id="name" name="name" placeholder="Masukkan nama" className='placeholder:text-slate-600 w-full h-10 px-3 py-3 shadow-sm rounded-lg border-[1.5px] border-slate-700 bg-white text-base text-slate-900 transition duration-[0.2s] ease-[cubic-bezier(.4,0,1,1)]focus:border-indigo-500 focus:outline-none' />
                    <input type="text" id="country" name="country" placeholder="Masukkan asal negara" className='placeholder:text-slate-600 w-full h-10 px-3 py-3 shadow-sm rounded-lg border-[1.5px] border-slate-700 bg-white text-base text-slate-900 transition duration-[0.2s] ease-[cubic-bezier(.4,0,1,1)]focus:border-indigo-500 focus:outline-none' />
                    <input type="text" id="city" name="city" placeholder="Masukkan asal kota" className='placeholder:text-slate-600 w-full h-10 px-3 py-3 shadow-sm rounded-lg border-[1.5px] border-slate-700 bg-white text-base text-slate-900 transition duration-[0.2s] ease-[cubic-bezier(.4,0,1,1)]focus:border-indigo-500 focus:outline-none' />
                    <input type="text" id="postCode" name="postCode" placeholder="Masukkan asal kode pos" className='placeholder:text-slate-600 w-full h-10 px-3 py-3 shadow-sm rounded-lg border-[1.5px] border-slate-700 bg-white text-base text-slate-900 transition duration-[0.2s] ease-[cubic-bezier(.4,0,1,1)]focus:border-indigo-500 focus:outline-none' />
                    <input type="text" id="favouriteSubjects" name="favouriteSubjects" placeholder="Masukkan asal pelajaran kesukaan" className='placeholder:text-slate-600 w-full h-10 px-3 py-3 shadow-sm rounded-lg border-[1.5px] border-slate-700 bg-white text-base text-slate-900 transition duration-[0.2s] ease-[cubic-bezier(.4,0,1,1)]focus:border-indigo-500 focus:outline-none' />
                    <button className='flex justify-center items-center gap-1 w-full px-4 py-2 rounded-lg bg-indigo-600 font-medium text-base text-white transition ease-in-out duration-150 hocus:ring-2 hocus:ring-offset-2 hocus:ring-indigo-600 hocus:ring-offset-slate-900 focus:outline-none active:bg-indigo-700'>
                        Simpan
                    </button>
                </form>
            </div>
        </section>
    )
}
