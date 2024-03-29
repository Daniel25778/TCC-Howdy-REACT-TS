import { Button, Flex, Icon, IconButton, Image, Input, InputGroup, Text, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import { MdTranslate } from 'react-icons/md';
import { isUndefined } from 'util';
import Router from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import Commentary from '../Comments/Comments';
import { useRouter } from 'next/router';
import { api as apiFunction } from '../../services/api';
import { formatDateCreatedAt } from '../../functions/formatDateCreatedAt';

interface PostProps {
    userCreator: any;
    post: any;
    userLogged?: any;
}

export default function Post({ userCreator, post, userLogged }: PostProps) {
    console.log('POSTPROPS', userCreator, post, userLogged);

    const [displayTextContentPost, setDisplayTextContentPost] = useState<any>('flex');
    const [displayTextContentPostTraduct, setDisplayTextContentPostTraduct] = useState<any>('none');

    const [comments, setComments] = useState<any>([]);
    const [sentenceNotTraduct, setSentenceNotTraduct] = useState<any>(post.textContent);
    const [wasTraduct, setWasTraduct] = useState<boolean>(true);
    const [totalComments, setTotalComments] = useState<number>(post.totalComments);
    const [display, setDisplay] = useState<any>('none');
    const [datePost, setDatePost] = useState<any>('');

    useEffect(() => {
        setDatePost(formatDateCreatedAt(post.createdAt));
    }, [datePost]);

    const [isCommentBlockOpen, setIsCommentBlockOpen] = useState<boolean>(false);
    const [liked, setLiked] = useState<boolean>(post.liked);
    const [totalLikes, setTotalLikes] = useState<any>(post.totalLikes);
    const [postTextContentTraduct, setPostTextContentTraduct] = useState<any>(sentenceNotTraduct);

    const router = useRouter();
    let api = apiFunction();
    const toast = useToast();

    function handleAccessToProfile() {
        Router.push(`/UserPage/Post/${post.userCreator.idUser}`);
    }

    function handleAccessComments() {
        setIsCommentBlockOpen(true);
        setDisplay('flex');

        //Pegar comentarios atraves do id da postagem

        api.get(`posts/commentary/${post.idPost}`)
            .then((response) => {
                setComments(response.data);
                console.log({comments: response.data})
            })
            .catch((err) => console.log(err));
    }

    function handleCloseComments() {
        setIsCommentBlockOpen(false);
        setDisplay('none');
    }

    function handleSendComment() {
        //@ts-ignore
        const commentary = document.getElementById('comment-input')?.value;
        if (!router.isFallback) {
            api.post(`posts/commentary/${post.idPost}`, {
                textContent: commentary,
            })
                .then((response: any) => {
                    setTotalComments(comments.length + 1);

                    setComments([
                        {
                            commenter: userLogged,
                            idPostCommentary: response.data.insertId,
                            textCommentary: commentary,
                            postCommentaryCreatedAt: new Date().toISOString().slice(0, 10),
                            postCommentaryEditedAt: null,
                        },
                        ...comments,
                    ]);

                    toast({
                        title: 'COMENTÁRIO CRIADO COM SUCESSO!',
                        status: 'success',
                        isClosable: true,
                        position: 'top',
                    });

                    // Router.push('/UserPage/Post/1');
                })
                .catch((error: any) => {
                    toast({
                        title: 'OPS... ALGO DE ERRADO OCORREU, TENTE NOVAMENTE.',
                        status: 'error',
                        isClosable: true,
                        position: 'top',
                    });
                });
        }
    }

    function handleLike() {
        if (!router.isFallback) {
            api.post(`posts/like/${post.idPost}`)
                .then((response) => {
                    setTotalLikes(totalLikes + 1);
                    setLiked(true);
                })
                .catch((err) => console.log(err));
        }
    }

    function handleUnlike() {
        if (!router.isFallback) {
            api.delete(`posts/like/${post.idPost}`)
                .then((response) => {
                    setTotalLikes(totalLikes - 1);
                    setLiked(false);
                })
                .catch((err) => console.log(err));
        }
    }

    function handleTranslate() {
        const nativeLanguageTranslatorName = userLogged.nativeLanguageTranslatorName;

        console.log(nativeLanguageTranslatorName);
        console.log(sentenceNotTraduct);

        if (!router.isFallback) {
            if (wasTraduct) {
                if (sentenceNotTraduct == postTextContentTraduct) {
                    api.post(`traductions`, {
                        toLanguage: nativeLanguageTranslatorName,
                        texts: [sentenceNotTraduct],
                    })
                        .then((response: any) => {
                            setPostTextContentTraduct(response.data[0]);
                            setDisplayTextContentPostTraduct('flex');
                            setDisplayTextContentPost('none');
                            toast({
                                title: 'TRADUÇÃO REALIZADA COM SUCESSO!',
                                status: 'success',
                                isClosable: true,
                                position: 'top',
                            });
                        })
                        .catch((error: any) => {
                            toast({
                                title: 'OPS... ALGO DE ERRADO OCORREU, TENTE NOVAMENTE.',
                                status: 'error',
                                isClosable: true,
                                position: 'top',
                            });
                        });
                } else {
                    setSentenceNotTraduct(post.textContent);
                    setDisplayTextContentPostTraduct('none');
                    setDisplayTextContentPost('flex');
                    console.log(sentenceNotTraduct);
                    setWasTraduct(true);
                }
            }
        }
    }

    function handleTranslateAgain() {
        setWasTraduct(true);

        const targetLanguageTranslatorName = userLogged.targetLanguageTranslatorName;

        console.log(postTextContentTraduct);

        if (!router.isFallback) {
            api.post(`traductions`, {
                toLanguage: targetLanguageTranslatorName,
                texts: [postTextContentTraduct[0]],
            })
                .then((response: any) => {
                    setPostTextContentTraduct(response.data);
                    setDisplayTextContentPostTraduct('flex');
                    setDisplayTextContentPost('none');

                    toast({
                        title: 'TRADUÇÃO REALIZADA COM SUCESSO!',
                        status: 'success',
                        isClosable: true,
                        position: 'top',
                    });
                })
                .catch((error: any) => {
                    toast({
                        title: 'OPS... ALGO DE ERRADO OCORREU, TENTE NOVAMENTE.',
                        status: 'error',
                        isClosable: true,
                        position: 'top',
                    });
                });
        }
    }

    return (
        <>
            <Flex width="100%" align={'center'} mt="5%" flexDir="column">
                <Flex mb="1%" gap="3%" width="40%">
                    <Flex width="20%">
                        {userCreator?.profilePhoto && (
                            <Image
                                borderRadius="100%"
                                width="5vw"
                                height="5vw"
                                objectFit="cover"
                                src={userCreator?.profilePhoto}
                                alt="profilePhoto"
                                _hover={{ cursor: 'pointer' }}
                                onClick={handleAccessToProfile}
                            ></Image>
                        )}
                    </Flex>
                    <Flex width="90%">
                        <Flex w="100%" flexDir="column">
                            <Flex  align="center" gap="1%">
                                <Text
                                    w="8rem"
                                    color="howdyColors.mainBlack"
                                    fontWeight={'bold'}
                                    fontSize={['sm', 'md', 'x-large']}
                                >
                                    {userCreator.userName}
                                </Text>
                                <Text
                                    width="100%"
                                    
                                    color="howdyColors.mainBlack"
                                    opacity="60%"
                                    fontSize={['sm', 'md', 'md']}
                                >
                                    ● {datePost}
                                </Text>
                            </Flex>
                            <Text display={displayTextContentPostTraduct}>{postTextContentTraduct}</Text>
                            <Text
                                display={displayTextContentPost}
                                color="howdyColors.mainBlack"
                                fontSize={['sm', 'md', 'md']}
                            >
                                {sentenceNotTraduct}
                            </Text>
                            <IconButton
                                w="10%"
                                aria-label="Open navigation"
                                bgColor="howdyColors.mainBlue"
                                borderRadius="15"
                                icon={
                                    <Icon
                                        opacity="2"
                                        as={MdTranslate}
                                        onClick={handleTranslate}
                                        color="howdyColors.mainWhite"
                                        fontSize={'x-large'}
                                    />
                                }
                            ></IconButton>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex w="40%" mb="1%">
                    <Image borderRadius="50" w="100%" h="100%" src={post?.imageContent}></Image>
                </Flex>
                <Flex justify="space-between" align="center" width="20%">
                    <Flex
                        align="center"
                        h="100%"
                        borderRadius="100px 100px 0px 0px"
                        bgColor={isCommentBlockOpen ? 'howdyColors.mainBlue' : '#fff'}
                        justifyContent="center"
                        gap="10%"
                        w="40%"
                    >
                        {isCommentBlockOpen ? (
                            <IconButton
                                w="10%"
                                aria-label="Open navigation"
                                bgColor="#ffffff00"
                                borderRadius="15"
                                onClick={handleCloseComments}
                                _hover={{ cursor: 'pointer' }}
                                icon={
                                    <Icon
                                        opacity="2"
                                        as={AiOutlineMessage}
                                        color={'howdyColors.mainWhite'}
                                        fontSize={'x-large'}
                                    />
                                }
                            />
                        ) : (
                            <IconButton
                                w="10%"
                                aria-label="Open navigation"
                                bgColor="#ffffff00"
                                borderRadius="15"
                                onClick={handleAccessComments}
                                _hover={{ cursor: 'pointer' }}
                                icon={
                                    <Icon
                                        opacity="2"
                                        as={AiOutlineMessage}
                                        color="howdyColors.mainBlue"
                                        fontSize={'x-large'}
                                    />
                                }
                            />
                        )}
                        <Text
                            color={isCommentBlockOpen ? 'howdyColors.mainWhite' : 'howdyColors.mainBlack'}
                            fontSize={['sm', 'md', 'md']}
                        >
                            {totalComments}
                        </Text>
                    </Flex>

                    <Flex gap="10%" w="20%" align="center">
                        {liked ? (
                            <IconButton
                                w="10%"
                                aria-label="Open navigation"
                                bgColor="#ffffff33"
                                borderRadius="15"
                                onClick={() => {
                                    handleUnlike();
                                }}
                                _hover={{ cursor: 'pointer' }}
                                icon={
                                    <Icon
                                        opacity="2"
                                        as={AiFillHeart}
                                        color={'howdyColors.mainRed'}
                                        fontSize={'x-large'}
                                    />
                                }
                            />
                        ) : (
                            <IconButton
                                w="10%"
                                aria-label="Open navigation"
                                bgColor="#ffffff33"
                                borderRadius="15"
                                onClick={() => {
                                    handleLike();
                                }}
                                _hover={{ cursor: 'pointer' }}
                                icon={
                                    <Icon
                                        opacity="2"
                                        as={AiOutlineHeart}
                                        color={'howdyColors.mainBlue'}
                                        fontSize={'x-large'}
                                    />
                                }
                            ></IconButton>
                        )}
                        <Text color="howdyColors.mainBlack" fontSize={['sm', 'md', 'md']}>
                            {totalLikes}
                        </Text>
                    </Flex>
                </Flex>
                <Flex
                    p="1%"
                    flexDir="column"
                    borderRadius="12"
                    bgColor="howdyColors.mainBlue"
                    display={display}
                    justifyContent="center"
                    width="50%"
                >
                    {comments.length > 0 &&
                        comments
                            ?.sort((a, b) => new Date(a.postCommentaryCreatedAt) - new Date(b.postCommentaryCreatedAt))
                            ?.map((commentary) => (
                                <Commentary key={commentary.idPostCommentary} commentary={commentary} />
                            ))}
                    <Flex gap="2%" align="center" w="100%">
                        <Image borderRadius="100%" width="5rem" height="5rem" src={userLogged?.profilePhoto} />
                        <InputGroup h="60%" width="70%" variant="unstyled">
                            <Input
                                fontSize={['sm', 'md', 'x-large']}
                                px="2%"
                                bg="howdyColors.main"
                                name="search"
                                placeholder="Comente também em (Inglês)"
                                type="text"
                                focusBorderColor="howdyColors.mainWhite"
                                borderRadius="100px"
                                id="comment-input"
                            />
                        </InputGroup>
                        <Button onClick={handleSendComment} bgColor="#fff3" textColor={'howdyColors.mainWhite'} w="20%">
                            Comentar
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true, //true, false, 'blocking'
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { idUser } = params;

    return {
        props: { idUser },
    };
};
