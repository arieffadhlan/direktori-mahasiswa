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

export async function getServerSideProps({ params }: any) {
    const res = await fetch(`http://localhost:8080/api/v1/students/${params.id}`);
    const data = await res.json();

    return {
        props: { 
            student: data 
        }
    }
}

const studentEdit = (props: studentProp) => {
    const { student }: any = props;
    // const []
}