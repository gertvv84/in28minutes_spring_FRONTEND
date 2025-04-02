const person = {
    name: 'Gert',
    address: {
        line1: 'Jeruzalemstraat 41',
        line2: '9420 Erpe-Mere'
    },
    profiles: ['twitter','linkedin','instagram'],
    printProfile: () => { 
        person.profiles.map(
            (profile) => console.log(profile)
        )
    }
}

export default function LearningJavascript() {
    return(
        <div>
            <div>{person.name}</div>
            <div>{person.address.line1}</div>
            <div>{person.profiles[0]}</div>
            <div>{person.printProfile()}</div>
        </div>

    )

}