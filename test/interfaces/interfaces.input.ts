// tslint:disable
interface Context {
    params: any
    req: {
        body: { [key: string]: any }
    }
}

interface SpecificContext<P> extends Context {
    params: P
}

type InstanceOfSpecificContext = SpecificContext<{ id: number }>
