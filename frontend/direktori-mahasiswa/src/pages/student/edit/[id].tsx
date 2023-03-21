import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

type Identity = {
	nim: string,
	email: string,
	name: string,
	favouriteSubjects: Array<string>,
}

type Address = {
    address: {
		country: string,
		city: string,
		postCode: string
	}
}

export const getServerSideProps: GetServerSideProps = async ({ params }: any) => {
	const request = await axios.get(`http://localhost:8080/api/v1/students/edit/${params.id}`);
    const response = await request.data;

    return {
        props: { 
            props: response
        }
    }
}

export default function edit({ props }: any) {
    const student = props;
    const [identities, setIdentities] = useState<Identity>({
        nim: student.nim,
        email: student.email,
        name: student.name,
        favouriteSubjects: [
            ...student.favouriteSubjects
        ],
    });
    const [addresses, setAddresses] = useState<Address>({
        address: {
            country: student.address.country,
            city: student.address.city,
            postCode: student.address.postCode,
        },
    });
    const router = useRouter();

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        
        if (['country', 'city', 'postCode'].includes(fieldName)) {
            setAddresses((prevAddress) => ({
                address: {
                    ...prevAddress.address,
                    [fieldName]: fieldValue 
                }
            }));
        } else {
            setIdentities((prevIdentity) => ({
                ...prevIdentity,
                [fieldName]: fieldName === 'favouriteSubjects' ? [fieldValue] : fieldValue
            }));
        }
    }
    
    const onHandleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = {
            ...identities,
            ...addresses
        }

        const options = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        
        axios.put(`http://localhost:8080/api/v1/students/${student.id}`, JSON.stringify(data), options)
            .then(() => {
                alert(`Mahasiswa dengan nama ${data.name} berhasil diperbarui`);
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
                    <input onChange={onChangeHandler} type="text" id="nim" name="nim" value={identities.nim} placeholder="Masukkan NIM" className='placeholder:text-slate-600 w-full h-10 px-3 py-3 shadow-sm rounded-lg border-[1.5px] border-slate-700 bg-white text-base text-slate-900 transition duration-[0.2s] ease-[cubic-bezier(.4,0,1,1)]focus:border-indigo-500 focus:outline-none' />
                    <input onChange={onChangeHandler} type="email" id="email" name="email" value={identities.email} placeholder="Masukkan email" className='placeholder:text-slate-600 w-full h-10 px-3 py-3 shadow-sm rounded-lg border-[1.5px] border-slate-700 bg-white text-base text-slate-900 transition duration-[0.2s] ease-[cubic-bezier(.4,0,1,1)]focus:border-indigo-500 focus:outline-none' />
                    <input onChange={onChangeHandler} type="text" id="name" name="name" value={identities.name} placeholder="Masukkan nama" className='placeholder:text-slate-600 w-full h-10 px-3 py-3 shadow-sm rounded-lg border-[1.5px] border-slate-700 bg-white text-base text-slate-900 transition duration-[0.2s] ease-[cubic-bezier(.4,0,1,1)]focus:border-indigo-500 focus:outline-none' />
                    <input onChange={onChangeHandler} type="text" id="country" name="country" value={addresses.address.country} placeholder="Masukkan asal negara" className='placeholder:text-slate-600 w-full h-10 px-3 py-3 shadow-sm rounded-lg border-[1.5px] border-slate-700 bg-white text-base text-slate-900 transition duration-[0.2s] ease-[cubic-bezier(.4,0,1,1)]focus:border-indigo-500 focus:outline-none' />
                    <input onChange={onChangeHandler} type="text" id="city" name="city" value={addresses.address.city} placeholder="Masukkan asal kota" className='placeholder:text-slate-600 w-full h-10 px-3 py-3 shadow-sm rounded-lg border-[1.5px] border-slate-700 bg-white text-base text-slate-900 transition duration-[0.2s] ease-[cubic-bezier(.4,0,1,1)]focus:border-indigo-500 focus:outline-none' />
                    <input onChange={onChangeHandler} type="text" id="postCode" name="postCode" value={addresses.address.postCode} placeholder="Masukkan asal kode pos" className='placeholder:text-slate-600 w-full h-10 px-3 py-3 shadow-sm rounded-lg border-[1.5px] border-slate-700 bg-white text-base text-slate-900 transition duration-[0.2s] ease-[cubic-bezier(.4,0,1,1)]focus:border-indigo-500 focus:outline-none' />
                    <input onChange={onChangeHandler} type="text" id="favouriteSubjects" name="favouriteSubjects" value={identities.favouriteSubjects} placeholder="Masukkan asal pelajaran kesukaan" className='placeholder:text-slate-600 w-full h-10 px-3 py-3 shadow-sm rounded-lg border-[1.5px] border-slate-700 bg-white text-base text-slate-900 transition duration-[0.2s] ease-[cubic-bezier(.4,0,1,1)]focus:border-indigo-500 focus:outline-none' />
                    <button className='flex justify-center items-center gap-1 w-full px-4 py-2 rounded-lg bg-indigo-600 font-medium text-base text-white transition ease-in-out duration-150 hocus:ring-2 hocus:ring-offset-2 hocus:ring-indigo-600 hocus:ring-offset-slate-900 focus:outline-none active:bg-indigo-700'>
                        Simpan
                    </button>
                </form>
            </div>
        </section>
    )
}