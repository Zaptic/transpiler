// tslint:disable
interface Context {
    params: any
    isValid?: boolean
    req: {
        body: { [key: string]: any }
    }
}

interface SpecificContext<P> extends Context {
    params: P
    'hyphenated-property': number
}

type InstanceOfSpecificContext = SpecificContext<{ id: number }>
