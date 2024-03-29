import { Box, Icon, IconButton } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { BiCheck } from 'react-icons/bi';
import { BsPersonDash, BsPersonPlus } from 'react-icons/bs';
import { MdOutlinePersonAddDisabled } from 'react-icons/md';
import { useRouter } from 'next/router';
import Loading from '../Loading/Loading';
import { IconPageUserButton } from './IconPageUserButton';
import { api as apiFunction } from '../../services/api';

interface FriendshipButtonProps {
    idUserFriend: number;
    friendshipState: string;
    setFriendshipState: Dispatch<SetStateAction<string>>;
    stateFlexButton: string;
    idUserLogged: number;
}

export function FriendshipButton({
    idUserLogged,
    friendshipState,
    setFriendshipState,
    stateFlexButton,
    idUserFriend,
}: FriendshipButtonProps) {
    const api = apiFunction();

    function handleDeleteFriendship() {
        api.delete(`friendships/${idUserFriend}`).then((response) => {
            setFriendshipState('userIsNotFriend');
        });
    }

    function handleAcceptFriendship() {
        api.put(`friendships/accept/${idUserFriend}`)
            .then((response) => {
                setFriendshipState('areFriends');
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    function handleSendFriendship() {
        api.post(`friendships/${idUserFriend}`)
            .then((response) => {
                setFriendshipState('cancelFriendshipRequest');
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    return (
        <>
            {friendshipState == 'userIsNotFriend' ? (
                <IconPageUserButton
                    display={stateFlexButton}
                    bg="howdyColors.mainGreenTransparent"
                    color="howdyColors.mainGreen"
                    onclick={handleSendFriendship}
                    icon={<Icon opacity="2" as={BsPersonPlus} fontWeight="black" />}
                />
            ) : friendshipState == 'areFriends' ? (
                <IconPageUserButton
                    display={stateFlexButton}
                    bg="howdyColors.mainRedTransparent"
                    color="howdyColors.mainRed"
                    icon={<Icon opacity="2" as={BsPersonDash} fontWeight="black" />}
                    onclick={handleDeleteFriendship}
                />
            ) : friendshipState == 'cancelFriendshipRequest' ? (
                <IconPageUserButton
                    display={stateFlexButton}
                    bg="howdyColors.mainRedTransparent"
                    color="howdyColors.mainRed"
                    onclick={handleDeleteFriendship}
                    icon={<Icon opacity="2" as={MdOutlinePersonAddDisabled} fontWeight="black" />}
                />
            ) : (
                friendshipState == 'acceptOrDeclineFriendshipRequest' && (
                    <Box w="80px" ml="10%">
                        <IconButton
                            display={stateFlexButton}
                            h="80px"
                            w="80px"
                            mt="5vw"
                            borderRadius="100%"
                            variant="unstyled"
                            aria-label="Open navigation"
                            pt="10px"
                            fontSize="40px"
                            bg="howdyColors.mainGreenTransparent"
                            color="howdyColors.mainGreen"
                            onClick={handleAcceptFriendship}
                            icon={<Icon opacity="2" as={BiCheck} fontWeight="black" />}
                        />
                        <IconButton
                            display={stateFlexButton}
                            h="80px"
                            w="80px"
                            mt="20px"
                            borderRadius="100%"
                            variant="unstyled"
                            aria-label="Open navigation"
                            pt="10px"
                            onClick={handleDeleteFriendship}
                            fontSize="40px"
                            bg="howdyColors.mainRedTransparent"
                            color="howdyColors.mainRed"
                            icon={<Icon opacity="2" as={BsPersonDash} fontWeight="black" />}
                        />
                    </Box>
                )
            )}
        </>
    );
}
