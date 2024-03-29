import { Box, Flex, Icon, SimpleGrid } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { Heading, Text } from '@chakra-ui/react';
import { BiTargetLock } from 'react-icons/bi';

import { FaBaby } from 'react-icons/fa';
import { FriendshipButton } from '../Button/FriendshipButton';
import { WeeklyChart } from '../Chart/WeeklyChart';
import { MonthlyChart } from '../Chart/MonthlyChart';
import StarRatings from 'react-star-ratings';
import ProfilePhotoAndPatent from '../ProfilePhotoAndPatent/ProfilePhotoAndPatent';
import { Dispatch, SetStateAction } from 'react';

interface UserDataPageProps {
    user?: any;
    friendshipState?: string;
    setFriendshipState?: Dispatch<SetStateAction<string>>;
    stateFlexButton: string;
    idUser?: any;
}
//DADOS RETORNADOS PELO O FIREBASE

// "idUser": 4,
// "profilePhoto": null,
// "userName": "GabrielTSR",
// "description": "Olá! Sou GabrielTSR, português brasileiro é meu idioma nativo, e desejo aprender a me comunicar em inglês americano.",
// "backgroundImage": null,
// "subscriptionEndDate": null,
// "howdyCoin": 0,
// "idTargetLanguage": 2,
// "targetLanguageName": "Inglês americano",
// "targetLanguageTranslatorName": "en",
// "idNativeLanguage": 1,
// "nativeLanguageName": "Português brasileiro",
// "nativeLanguageTranslatorName": "pt"

// xpCharts:
// monthly: (30) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// weekly: (7) [0, 0, 0, 0, 0, 0, 0]
export default function UserDataPage({
    user,
    friendshipState,
    setFriendshipState,
    stateFlexButton,
    idUser,
}: UserDataPageProps) {
    //const createdAt = new Date(user.createdAt);

    const weeklyXpSeries = [
        {
            name: 'weeklyXpSeries',
            data: user.xpCharts?.weekly,
        },
    ];

    const monthlyXpSeries = [
        {
            name: 'monthlyXpSeries',
            data: user.xpCharts?.monthly,
        },
    ];

    console.log(user?.averageEvaluations);

    return (
        <>
            <Box>
                <Image
                    filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
                    objectFit="cover"
                    w="100%"
                    maxH="25vw"
                    src={user?.backgroundImage ? user.backgroundImage : '/images/Tests/backgroundImage.png'}
                />
                <Flex w="100%" position="relative" bottom="4vw" pl="8vw">
                    <ProfilePhotoAndPatent sizePatent="5rem" user={user} whiteBorder={true} size="12.5vw" />
                    <Box color="howdyColors.mainBlack" flex="1" ml="10%" mt="5vw">
                        <Heading wordBreak="break-word" fontSize="4xl">
                            {user.userName}
                        </Heading>
                        <Text mt="20px" fontSize="xl" color="howdyColors.mainBlack">
                            {user.description}
                        </Text>
                    </Box>
                    <FriendshipButton
                        idUserFriend={idUser}
                        stateFlexButton={stateFlexButton}
                        friendshipState={friendshipState}
                        setFriendshipState={setFriendshipState}
                        idUserLogged={user.idUser}
                    />
                </Flex>
                <Box bg="howdyColors.divider" h="1px" w="100%" mb="70" />
            </Box>
            <Box>
                <Flex>
                    <Flex width="100%">
                        <Text
                            color="howdyColors.mainBlack"
                            fontWeight={'bold'}
                            fontSize={['sm', 'xx-large', 'xxx-large']}
                        >
                            Desempenho
                        </Text>
                        <Flex  gap={"2%"} 
                            filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
                            ml="6%"
                            w="20%"
                            alignItems="center"
                            justifyContent="center"
                            bgColor="howdyColors.mainGreenTransparent"
                            borderRadius="10"
                            p="2"
                            color="howdyColors.mainGreen"
                            fontWeight={'bold'}
                            fontSize={['sm', 'md', 'xx-large']}
                            
                        >
                            <Flex  >
                            {user.totalXp} 
                            </Flex>

                            <Flex>
                                <Text>
                                    XP
                                </Text>
                            </Flex>
                            



                        </Flex>
                        <Flex gap="5%" ml="6%" justify={'center'} align={'center'}>
                            
                            <Icon color="howdyColors.mainGreen"  fontSize="x-large">
                                <BiTargetLock />
                            </Icon>
                            <Text color="howdyColors.mainGreen">{user.targetLanguageName}</Text>
                        </Flex>
                        <Flex gap="5%" ml="6%" justify={'center'} align={'center'}>
                            <Icon color="howdyColors.mainGreen" fontSize="x-large">
                                <FaBaby />
                            </Icon>
                            <Text color="howdyColors.mainGreen">{user.nativeLanguageName}</Text>
                        </Flex>
                    </Flex>
                </Flex>
                <SimpleGrid pl="10%" flex="1" gap="4" minChildWidth="320px">
                    <WeeklyChart title="DESEMPENHO SEMANAL" series={weeklyXpSeries} />
                    <MonthlyChart title="DESEMPENHO MENSAL" series={monthlyXpSeries} />
                </SimpleGrid>
                <Box bg="howdyColors.divider" h="1px" w="100%" mt="10" mb="70" />
            </Box>
            {user?.averageEvaluations !== 0 && (
                <Flex flexDir="column">
                    <Flex flexDir="row">
                        <Text
                            mb="5"
                            color="howdyColors.mainBlack"
                            fontWeight={'bold'}
                            fontSize={['sm', 'xx-large', 'xxx-large']}
                        >
                            Nota média de suas atividades
                        </Text>
                        <Flex
                            filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
                            ml="6%"
                            w="20%"
                            alignItems="center"
                            justifyContent="center"
                            bgColor="howdyColors.mainGreenTransparent"
                            borderRadius="10"
                            p="1"
                            color="howdyColors.mainGreen"
                            fontWeight={'bold'}
                            fontSize={['sm', 'md', 'xx-large']}
                        >
                            {
                                user?.averageEvaluations <= 1
                                ? "RUIM"
                                : user?.averageEvaluations  <=2
                                ? "REGULAR"
                                : user?.averageEvaluations <=3
                                ?  "BOM"
                                : user?.averageEvaluations <= 4
                                ? "ÓTIMO"
                                : user?.averageEvaluations <= 5
                                ? "EXCELENTE" 
                                : "N/A"
                            }
                        </Flex>
                    </Flex>
                    <Box w="10%"></Box>
                    <StarRatings
                        rating={user?.averageEvaluations}
                        starRatedColor="#F2D63F"
                        numberOfStars={5}
                        name="rating"
                    />
                    <Box bg="howdyColors.divider" h="1px" w="100%" mt="10" mb="70" />
                </Flex>
            )}
        </>
    );
}

// export async function getStaticProps() {
// onAuthStateChanged(auth, (user) => {
//     console.log(user);
// });
// return {
//     props: {
//         // uid,
//     },
// };
// }
