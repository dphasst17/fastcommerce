import { Button, Code, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { StateContext } from '../../context/stateContext'
import { useContext } from 'react'
import { UserAddressType, UserType } from 'types/type'
const ModalEditAddress = ({ currentAddress, setCurrentAddress }: { currentAddress: string, setCurrentAddress: React.Dispatch<React.SetStateAction<string>> }) => {
    const { user } = useContext(StateContext)
    return <ModalContent>
        {(onClose) => (
            <>
                <ModalHeader className="flex flex-col gap-1">Address</ModalHeader>
                <ModalBody>
                    {user && user.map(
                        (u: UserType) => u.address.map((a: UserAddressType) =>
                            <Code radius='sm'
                                onClick={() => { setCurrentAddress(a.detail); onClose() }}
                                className={`text-wrap overflow-hidden ${currentAddress === a.detail ? 'bg-blue-500' : 'bg-zinc-700'} cursor-pointer`}>
                                {a.detail}
                            </Code>
                        )
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={() => { onClose() }}>
                        Close
                    </Button>
                </ModalFooter>
            </>
        )}
    </ModalContent>
}

export default ModalEditAddress