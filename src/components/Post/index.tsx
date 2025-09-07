'use client';
import { useState } from 'react';
import type { Post as PostData } from '@/store/feed';
import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  TextField,
  Divider,
  Button,
  Skeleton,
  useTheme,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendIcon from '@mui/icons-material/Send';

interface PostProps {
  postData: PostData;
}

interface Heart {
  id: number;
  top: number;
  left: number;
}

export default function Post({ postData }: PostProps) {
  const theme = useTheme();
  const {
    user,
    image,
    caption,
    comments: initialComments,
    likes: initialLikes,
  } = postData;
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikes((l) => l + 1);
    }
  };

  const handleUnlike = () => {
    if (liked) {
      setLiked(false);
      setLikes((l) => l - 1);
    }
  };

  const handleLikeToggle = () => {
    if (liked) {
      handleUnlike();
    } else {
      handleLike();
    }
  };

  const handleDoubleClickLike = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleLike();

    const rect = event.currentTarget.getBoundingClientRect();
    const newHeart: Heart = {
      id: Date.now(),
      left: event.clientX - rect.left,
      top: event.clientY - rect.top,
    };

    setHearts((currentHearts) => [...currentHearts, newHeart]);

    setTimeout(() => {
      setHearts((currentHearts) => currentHearts.filter(h => h.id !== newHeart.id));
    }, 800);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      const newCommentObj = { user: 'Me', text: newComment };
      setComments([...comments, newCommentObj]);
      setNewComment('');
    }
  };

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mb: 4, bgcolor: 'background.paper' }}>
      <CardHeader
        avatar={<Avatar>{user.avatar}</Avatar>}
        title={user.username}
      />
      <Box sx={{ position: 'relative' }} onDoubleClick={handleDoubleClickLike}>
        {hearts.map((heart) => (
          <FavoriteIcon
            key={heart.id}
            className="heart-animation"
            style={{ top: `${heart.top}px`, left: `${heart.left}px` }}
            sx={{
              fontSize: 80,
              color: theme.palette.like.main,
            }}
          />
        ))}
        
        {isImageLoading && (
            <Skeleton variant="rectangular" height={400} />
        )}

        <CardMedia
          component="img"
          image={image}
          alt={caption}
          sx={{ 
            maxHeight: 600, 
            cursor: 'pointer',
            display: isImageLoading ? 'none' : 'block'
          }}
          onLoad={() => setIsImageLoading(false)}
          onError={() => setIsImageLoading(false)}
        />
      </Box>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleLikeToggle}>
          {liked ? (
            <FavoriteIcon sx={{ color: theme.palette.like.main }} /> // Use theme color
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
        <IconButton aria-label="comment">
          <ChatBubbleOutlineIcon />
        </IconButton>
        <IconButton aria-label="share">
          <SendIcon />
        </IconButton>
      </CardActions>
      <CardContent>
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          {likes.toLocaleString()} likes
        </Typography>
        <Typography variant="body2" component="p" sx={{ mt: 1 }}>
          <span style={{ fontWeight: 'bold' }}>{user.username}</span> {caption}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            View all {comments.length} comments
          </Typography>
          {comments.slice(0, 2).map((comment, index) => (
            <Typography
              key={index}
              variant="body2"
              component="p"
              sx={{ mt: 0.5 }}
            >
              <span style={{ fontWeight: 'bold' }}>{comment.user}</span>{" "}
              {comment.text}
            </Typography>
          ))}
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            fullWidth
            variant="standard"
            placeholder="Add a comment…"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            slotProps={{
              input: {
                disableUnderline: true,
              },
            }}
          />
          <Button
            size="small"
            onClick={handleAddComment}
            disabled={!newComment.trim()}
          >
            Post
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}