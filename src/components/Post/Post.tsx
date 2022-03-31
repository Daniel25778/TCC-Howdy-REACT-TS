import { Flex, Icon, IconButton, Image, Text } from "@chakra-ui/react";
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { MdTranslate } from "react-icons/md";

interface PostProps {
    user?: any;
}

export default function Post(props: PostProps){
    return(
        <>
        
        
            <Flex width="100%" align={'center'} mt="5%" flexDir="column">
                <Flex mb="1%" gap="3%" width="40%">
                    <Flex>
                        <Image 
                            borderRadius="100%"
                            height="5rem"
                            objectFit="cover"
                            src={props.user.profilePhoto}
                            alt="profilePhoto"
                        ></Image>
                    </Flex>
                    <Flex>
                        <Flex flexDir="column">
                            <Flex align="center" gap="1%">
                                <Text 
                                    color="howdyColors.mainBlack"
                                    fontWeight={'bold'}
                                    fontSize={['sm', 'md', 'x-large']}
                                >
                                    {props.user.userName}
                                </Text>
                                <Text  color="howdyColors.mainBlack" opacity="60%" fontSize={['sm', 'md', 'md']}>
                                    {' '}
                                    ● 19 Nov{' '}
                                </Text>
                            </Flex>
                            <Text color="howdyColors.mainBlack" fontSize={['sm', 'md', 'md']}>
                                Amet minim mollit non dese Amet minim mollit non deserunt ullamco est sit
                            </Text>
                            <IconButton 
                                w="10%"
                                aria-label="Open navigation"
                                bgColor="howdyColors.mainBlue"
                                borderRadius="15"
                                icon={
                                    <Icon 
                                        opacity="2"
                                        as={MdTranslate  }
                                        color="howdyColors.mainWhite"
                                        fontSize={'x-large'}
                                    />
                                }
                            ></IconButton>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex mb="1%">
                    <Image
                        borderRadius="50"
                        height="30rem"
                        objectFit="cover"
                        src="/images/Tests/Rectangle 23.svg"
                        alt="profilePhoto"
                    ></Image>
                </Flex>
                <Flex justify="space-between" align="center" width="20%">
                    <Flex align="center" gap="10%" w="20%">
                        <IconButton
                            w="10%"
                            aria-label="Open navigation"
                            bgColor="#ffffff33"
                            borderRadius="15"
                            icon={
                                <Icon
                                    opacity="2"
                                    as={AiOutlineMessage}
                                    color="howdyColors.mainBlue"
                                    fontSize={'x-large'}
                                />
                            }
                        ></IconButton>
                        <Text color="howdyColors.mainBlack" fontSize={['sm', 'md', 'md']}>
                            2 mil
                        </Text>
                    </Flex>

                    <Flex gap="10%" w="20%" align="center">
                        <IconButton
                            w="10%"
                            aria-label="Open navigation"
                            bgColor="#ffffff33"
                            borderRadius="15"
                            icon={
                                <Icon
                                    opacity="2"
                                    as={AiOutlineHeart}
                                    color="howdyColors.mainBlue"
                                    fontSize={'x-large'}
                                />
                            }
                        ></IconButton>
                        <Text color="howdyColors.mainBlack" fontSize={['sm', 'md', 'md']}>
                            1 mil
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
            
        
        
        
        
        </>
    )
}