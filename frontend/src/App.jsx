import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  TextField, 
  MenuItem, 
  Box, 
  Chip, 
  Button, 
  Badge, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  Divider, 
  ThemeProvider,
  createTheme
} from '@mui/material';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

// Custom theme mapping the PETfriendly's boutique interface color palette
const boutiqueTheme = createTheme({
  palette: {
    primary: { main: '#0e6273' },     // Deep Teal Header
    secondary: { main: '#f9b825' },   // Golden Yellow Display Panel
    background: { default: '#fcf8f2' } // Warm Off-White Page Canvas
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    h4: { fontWeight: 800, letterSpacing: '-0.3px' },
    h5: { fontWeight: 800, color: '#11333a' },
    h6: { fontWeight: 700, color: '#11333a' },
    body2: { color: '#4a5e61', fontWeight: 500 }
  }
});

const EXTENDED_MOCK_PETS = [
  { id: 1, name: 'Max', species: 'Dog', price: 250.00, description: 'Energetic Golden Retriever puppy, highly trained.', imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500' },
  { id: 2, name: 'Luna', species: 'Cat', price: 150.00, description: 'Calm Siamese cat who loves quiet afternoons.', imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500' },
  { id: 3, name: 'Bubbles', species: 'Fish', price: 45.00, description: 'Vibrant Halfmoon Betta fish with striking fins.', imageUrl: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=500' },
  { id: 4, name: 'Pip', species: 'Bird', price: 85.00, description: 'Cheerful green Budgerigar that loves whistling.', imageUrl: 'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?w=500' },
  { id: 5, name: 'Rocky', species: 'Dog', price: 300.00, description: 'Loyal German Shepherd puppy ready for protection.', imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500' },
  { id: 6, name: 'Oliver', species: 'Cat', price: 120.00, description: 'Playful Tabby kitten full of soft purrs.', imageUrl: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=500' },
  { id: 7, name: 'Finley', species: 'Fish', price: 15.00, description: 'Classic bright orange Fancy Goldfish.', imageUrl: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=500' },
  { id: 8, name: 'Spike', species: 'Reptile', price: 180.00, description: 'Docile juvenile Bearded Dragon lizard.', imageUrl: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=500' }
];

function App() {
  const [pets, setPets] = useState(EXTENDED_MOCK_PETS);
  const [speciesFilter, setSpeciesFilter] = useState('All');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
    fetch(`${API_BASE_URL}/api/pets`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) setPets(data);
      })
      .catch((err) => console.log('Boutique local presentation running...'));
  }, []);

  const addToCart = (pet) => {
    setCart((prev) => {
      const match = prev.find(item => item.id === pet.id);
      if (match) return prev.map(item => item.id === pet.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...pet, quantity: 1 }];
    });
  };

  const updateQuantity = (id, amount) => {
    setCart((prev) => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item));
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter(item => item.id !== id));

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const filteredPets = speciesFilter === 'All' ? pets : pets.filter(p => p.species.toLowerCase() === speciesFilter.toLowerCase());

  return (
    <ThemeProvider theme={boutiqueTheme}>
      <Box sx={{ minHeight: '100vh', pb: 10, bgcolor: 'background.default' }}>
        
        {/* Deep Teal Boutique Navigation Bar */}
        <Box sx={{ width: '100%', bgcolor: 'primary.main', display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2.5, px: { xs: 2, sm: 4, md: 6 }, boxSizing: 'border-box', position: 'sticky', top: 0, zIndex: 1100, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#ffffff', fontSize: { xs: '1.4rem', sm: '1.8rem' } }}>
            PET<Box component="span" sx={{ color: 'secondary.main', fontWeight: 400, fontStyle: 'italic' }}>friendly's</Box>🐾
          </Typography>
          
          <IconButton onClick={() => setIsCartOpen(true)} sx={{ color: '#ffffff', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}>
            <Badge badgeContent={totalCartItems} color="error" sx={{ '& .MuiBadge-badge': { fontWeight: 700 } }}>
              <ShoppingCartRoundedIcon />
            </Badge>
          </IconButton>
        </Box>

        {/* Global Content Bounds */}
        <Box sx={{ width: '100%', px: { xs: 2, sm: 4, md: 6 }, boxSizing: 'border-box', mt: 5 }}>
          
          {/* Header Filtering Alignment */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 4, gap: 2 }}>
            <Box>
              <Typography variant="h4" sx={{ color: '#11333a', mb: 0.5, fontWeight: 800 }}>
                Best Sellers
              </Typography>
              <Typography variant="body1" sx={{ color: '#7a8e91' }}>
                Browse our beautifully organized catalog of happy, premium pets.
              </Typography>
            </Box>

            <TextField
              select
              label="Filter Category"
              value={speciesFilter}
              onChange={(e) => setSpeciesFilter(e.target.value)}
              InputProps={{ sx: { borderRadius: 3, fontWeight: 700, bgcolor: '#ffffff' } }}
              sx={{ width: 220 }}
            >
              <MenuItem value="All">✨ All Categories</MenuItem>
              <MenuItem value="Dog">🐕 Dogs</MenuItem>
              <MenuItem value="Cat">🐈 Cats</MenuItem>
              <MenuItem value="Fish">🐠 Fish</MenuItem>
              <MenuItem value="Bird">🦜 Birds</MenuItem>
              <MenuItem value="Reptile">🦎 Reptiles</MenuItem>
            </TextField>
          </Box>

          {/* Golden Yellow Framed Display Panel Container */}
          <Box sx={{ 
            bgcolor: 'secondary.main', 
            borderRadius: 6, 
            p: { xs: 3, sm: 4, md: 5 }, 
            boxShadow: 'inset 0px 4px 10px rgba(0,0,0,0.05), 0px 10px 30px rgba(249,184,37,0.2)' 
          }}>
            <Grid container spacing={3} alignItems="stretch">
              {filteredPets.map((pet) => (
                <Grid item key={pet.id} xs={12} sm={6} md={4} lg={3} display="flex">
                  <Card sx={{ 
                    width: '100%',
                    height: '480px', // Strict structural card height constraint
                    display: 'flex', 
                    flexDirection: 'column', 
                    borderRadius: 4, 
                    bgcolor: '#fbf7f0', // Warm cream background from your reference image
                    border: '1px solid #e2dcd5',
                    boxShadow: '0px 4px 12px rgba(0,0,0,0.02)',
                    p: 0, // Zero out parent padding so the cream block reaches the edge
                    boxSizing: 'border-box',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    
                    {/* Species Badge Floating Top Right */}
                    <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2 }}>
                      <Chip 
                        label={pet.species} 
                        size="small" 
                        sx={{ 
                          fontWeight: 800, 
                          fontSize: '0.65rem',
                          bgcolor: 'rgba(14, 98, 115, 0.1)', 
                          color: 'primary.main',
                          borderRadius: '6px',
                          textTransform: 'uppercase'
                        }} 
                      />
                    </Box>

                    {/* Image Area: Floating product style box */}
                    <Box sx={{ 
                      width: '100%', 
                      height: '240px', // Exact mathematical half of the card
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: 2, // Keeps the image floating safely inside the cream area
                      boxSizing: 'border-box'
                    }}>
                      <CardMedia
                        component="img"
                        image={pet.imageUrl || 'https://via.placeholder.com/300?text=No+Image'}
                        alt={pet.name}
                        sx={{ 
                          maxWidth: '100%',
                          maxHeight: '100%',
                          width: 'auto',
                          height: 'auto',
                          objectFit: 'contain', // Prevents image backgrounds from stretching unevenly
                          borderRadius: 2
                        }}
                      />
                    </Box>

                    {/* Bottom Lower Deck: Pure White Text Canvas Block */}
                    <Box sx={{ 
                      flexGrow: 1, 
                      bgcolor: '#ffffff', // Crisp white lower background sheet
                      p: 3, 
                      display: 'flex', 
                      flexDirection: 'column',
                      textAlign: 'center',
                      borderTop: '1px solid #e2dcd5'
                    }}>
                      {/* Title Window */}
                      <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main', fontSize: '1.05rem', mb: 0.5 }}>
                        {pet.name}
                      </Typography>
                      
                      {/* Description Window */}
                      <Typography variant="body2" sx={{ 
                        display: '-webkit-box', 
                        WebkitLineClamp: 1, // Restricts description to exactly 1 line for flawless balance
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        fontSize: '0.8rem',
                        color: '#7a8e91',
                        mb: 2
                      }}>
                        {pet.description}
                      </Typography>

                      {/* Pricing Block pushed perfectly to baseline */}
                      <Typography variant="h6" sx={{ color: '#11333a', fontWeight: 800, mb: 2, mt: 'auto' }}>
                        ${pet.price.toFixed(2)}
                      </Typography>

                      {/* Outlined Action Button */}
                      <Button 
                        variant="outlined" 
                        fullWidth
                        onClick={() => addToCart(pet)}
                        sx={{ 
                          borderRadius: 2.5, 
                          textTransform: 'none', 
                          fontWeight: 700, 
                          py: 0.8,
                          fontSize: '0.85rem',
                          color: 'primary.main',
                          borderColor: '#cbd5e1',
                          borderWidth: '1.5px',
                          '&:hover': { 
                            borderColor: 'primary.main', 
                            bgcolor: 'rgba(14, 98, 115, 0.04)',
                            borderWidth: '1.5px'
                          }
                        }}
                      >
                        Add to cart
                      </Button>
                    </Box>

                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* Slide-out Checkout Basket Drawer */}
        <Drawer anchor="right" open={isCartOpen} onClose={() => setIsCartOpen(false)}>
          <Box sx={{ width: { xs: 320, sm: 400 }, p: 4, height: '100%', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', bgcolor: '#fcf8f2' }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 800 }}>🛍️ Your Basket</Typography>
            <Divider sx={{ mb: 2 }} />

            {cart.length === 0 ? (
              <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 1 }}>
                <Typography variant="h6" color="text.secondary">Your basket is empty</Typography>
              </Box>
            ) : (
              <>
                <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
                  {cart.map((item) => (
                    <ListItem key={item.id} secondaryAction={
                      <IconButton edge="end" color="error" onClick={() => removeFromCart(item.id)}>
                        <DeleteOutlineRoundedIcon />
                      </IconButton>
                    } sx={{ px: 0, py: 1.5 }}>
                      <ListItemText 
                        primary={item.name} 
                        secondary={`$${item.price.toFixed(2)}`} 
                        primaryTypographyProps={{ fontWeight: 700 }}
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2, bgcolor: '#f0e6da', p: 0.5, borderRadius: 2 }}>
                        <IconButton size="small" onClick={() => updateQuantity(item.id, -1)}><RemoveRoundedIcon fontSize="small" /></IconButton>
                        <Typography sx={{ fontWeight: 700 }}>{item.quantity}</Typography>
                        <IconButton size="small" onClick={() => updateQuantity(item.id, 1)}><AddRoundedIcon fontSize="small" /></IconButton>
                      </Box>
                    </ListItem>
                  ))}
                </List>

                <Box sx={{ pt: 3, borderTop: '1px solid #cbd5e1' }}>
                  <Box display="flex" justifyContent="space-between" mb={3}>
                    <Typography variant="h6">Total Summary:</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>${totalCartPrice.toFixed(2)}</Typography>
                  </Box>
                  <Button variant="contained" color="primary" fullWidth size="large" sx={{ borderRadius: 3, fontWeight: 700, py: 1.5, textTransform: 'none' }}>
                    Proceed to Adoption
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}

export default App;