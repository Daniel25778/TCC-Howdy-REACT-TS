import { Flex, Icon, IconButton,  Link as ChakraLink, Text } from "@chakra-ui/react";
import { AiOutlineLinkedin } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { TiSocialFacebookCircular } from "react-icons/ti";
import Link from 'next/link';

export default function Footer(){
    return(
        <>
            <Flex  bgColor="howdyColors.mainWhite" gap="2rem" py="2%" pb="2%"  flexDir="column" w="100%">

                <Flex w="100%" align="center" justifyContent="center">
                    <Flex w="30%" align="center" justifyContent="space-between">
                        <ChakraLink color="howdyColors.mainBlack" opacity="60%" fontWeight="medium" fontSize={['sm', 'md', 'xx-large']}>
                            <Link href="/AboutUs">
                               Sobre nós
                            </Link>
                        </ChakraLink>

                        <ChakraLink color="howdyColors.mainBlack" opacity="60%" fontWeight="medium" fontSize={['sm', 'md', 'xx-large']}>
                            <Link href="/AboutUs">
                              Termos de uso
                            </Link>
                        </ChakraLink>

                        <ChakraLink color="howdyColors.mainBlack" opacity="60%" fontWeight="medium" fontSize={['sm', 'md', 'xx-large']}>
                            <Link href="/AboutUs">
                              Docentes
                            </Link>
                        </ChakraLink>
                    </Flex>
                </Flex>

                <Flex w="100%"  align="center" justifyContent="center">
                    <Flex w="15%" align="center" justifyContent="space-between">
                        
                        <IconButton
                            variant="unstyled"
                            aria-label="Open navigation"
                            fontSize="3rem"
                            color="howdyColors.mainBlue"
                            icon={<Icon opacity="2" as={AiOutlineLinkedin} fontWeight="black" />}
                        />

                        <IconButton
                        variant="unstyled"
                        aria-label="Open navigation"
                        fontSize="3rem"
                        color="howdyColors.mainBlue"
                        icon={<Icon opacity="2" as={TiSocialFacebookCircular} fontWeight="black" />} 
                        />

                        <IconButton
                            variant="unstyled"
                            aria-label="Open navigation"
                            fontSize="3rem"
                            color="howdyColors.mainBlue"
                            icon={<Icon opacity="2" as={MdOutlineAlternateEmail} fontWeight="black" />}
                        />
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
}