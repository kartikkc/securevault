import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  Plus,
  Search,
  Eye,
  EyeOff,
  Copy,
  Edit,
  Trash2,
  Globe,
  User,
  Settings,
  LogOut,
  Key,
  Lock,
  AlertCircle,
  CheckCircle2,
  MoreVertical
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import { ThemeToggle } from './ThemeToggle';

interface DashboardProps {
  user: { name: string };
  passwords: { id: string; website: string }[];
  onLogout: () => void;
}

interface PasswordEntry {
  id: string;
  website: string;
  // username: string;
  // password: string;
  // category: string;
  // lastUsed: string;
  // strength: 'weak' | 'medium' | 'strong';
}

const mockPasswords: PasswordEntry[] = [
  // {
  //   id: '1',
  //   website: 'Gmail',
  //   username: 'user@example.com',
  //   password: 'MySecureP@ss123!',
  //   category: 'Email',
  //   lastUsed: '2 hours ago',
  //   strength: 'strong'
  // },
  // {
  //   id: '2',
  //   website: 'GitHub',
  //   username: 'developer',
  //   password: 'DevCode2024',
  //   category: 'Development',
  //   lastUsed: '1 day ago',
  //   strength: 'medium'
  // },
  // {
  //   id: '3',
  //   website: 'Banking',
  //   username: 'john.doe',
  //   password: 'bank123',
  //   category: 'Finance',
  //   lastUsed: '3 days ago',
  //   strength: 'weak'
  // }
];
const emptyPasswords: PasswordEntry[] = [];

// export function Dashboard({ user, onLogout }: DashboardProps) {
// const [passwords, setPasswords] = useState<PasswordEntry[]>(mockPasswords);
export function Dashboard({ user, onLogout, passwords }: DashboardProps) {
  const [/*unused*/, /*setUnused*/] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPasswordId, setShowPasswordId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [viewMasterKey, setViewMasterKey] = useState(false);

  const categories = ['All', 'Email', 'Social', 'Finance', 'Development', 'Shopping'];

  // const filteredPasswords = passwords.filter(password => {
  const sourcePasswords: PasswordEntry[] = passwords ?? emptyPasswords;

  const filteredPasswords = sourcePasswords.filter(password => {
    const matchesSearch = password.website.toLowerCase().includes(searchTerm.toLowerCase()) ||

      //  password.username.toLowerCase().includes
      (searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All'
    // || password.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'strong': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'weak': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStrengthIcon = (strength: string) => {
    switch (strength) {
      case 'strong': return CheckCircle2;
      case 'medium': return AlertCircle;
      case 'weak': return AlertCircle;
      default: return AlertCircle;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-secondary/10">
      {/* Header */}
      <motion.header
        className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.02 }}
          >
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-semibold">SecureVault</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {user.name}</p>
            </div>
          </motion.div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Passwords', value: passwords.length, icon: Key, color: 'from-blue-500 to-blue-600' },
            // { label: 'Master String', icon: CheckCircle2, color: 'from-green-500 to-green-600' },
            // { label: 'Weak Passwords', value: passwords.filter(p => p.strength === 'weak').length, icon: AlertCircle, color: 'from-red-500 to-red-600' },
            { label: 'Categories', value: categories.length - 1, icon: Globe, color: 'from-purple-500 to-purple-600' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, rotateX: -10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className="p-6 bg-gradient-to-br from-card to-accent/20 border-2 hover:border-primary/20 transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-semibold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                  <motion.div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} p-3`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <stat.icon className="w-full h-full text-white" />
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
          {[{ label: 'Master String', icon: CheckCircle2, color: 'from-green-500 to-green-600' }].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, rotateX: -10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className="p-6 bg-gradient-to-br from-card to-accent/20 border-2 hover:border-primary/20 transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-semibold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                  <motion.div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} p-3`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <stat.icon className="w-full h-full text-white" />
                  </motion.div>
                </div>
              </Card>
            </motion.div> ))}
        </div>  
        {/* Search and Filter Bar */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search passwords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.div key={category} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="transition-all"
                >
                  {category}
                </Button>
              </motion.div>
            ))}
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Password
                </Button>
              </motion.div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Password</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="new-website">Website</Label>
                  <Input id="new-website" placeholder="example.com" />
                </div>
                <div>
                  <Label htmlFor="new-username">Username/Email</Label>
                  <Input id="new-username" placeholder="your@email.com" />
                </div>
                <div>
                  <Label htmlFor="new-password">Password</Label>
                  <Input id="new-password" type="password" placeholder="Your secure password" />
                </div>
                <Button className="w-full">Save Password</Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Password List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredPasswords.map((password, index) => {
              // const StrengthIcon = getStrengthIcon(password.strength);
              return (
                <motion.div
                  key={password.id}
                  layout
                  initial={{ opacity: 0, x: -20, rotateY: -5 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: 20, rotateY: 5 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -2, scale: 1.01 }}
                >
                  <Card className="p-6 bg-card/60 backdrop-blur-sm border hover:border-primary/20 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <motion.div
                          className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <Globe className="h-6 w-6 text-primary" />
                        </motion.div>

                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{password.website}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {/* {password.category} */}
                            </Badge>
                          </div>
                          {/* <p className="text-sm text-muted-foreground">{password.username}</p> */}
                          <div className="flex items-center space-x-2 mt-1">
                            {/* <StrengthIcon className={`h-4 w-4 ${getStrengthColor(password.strength)}`} /> */}
                            {/* <span className={`text-xs capitalize ${getStrengthColor(password.strength)}`}> */}
                            {/* {password.strength} */}
                            {/* </span> */}
                            {/* <span className="text-xs text-muted-foreground"> */}
                            {/* • Last used {password.lastUsed} */}
                            {/* </span> */}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowPasswordId(
                              showPasswordId === password.id ? null : password.id
                            )}
                          >
                            {showPasswordId === password.id ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </motion.div>

                        {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(password.password)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </motion.div> */}

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </motion.div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <AnimatePresence>
                      {showPasswordId === password.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 pt-4 border-t border-border"
                        >
                          <div className="bg-accent/20 rounded-lg p-3 font-mono text-sm">
                            <div className="flex items-center justify-between">
                              {/* <span>{password.password}</span> */}
                              {/* <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(password.password)}
                              >
                                <Copy className="h-3 w-3" />
                              </Button> */}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredPasswords.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No passwords found</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm || selectedCategory !== 'All'
                ? 'Try adjusting your search or filters'
                : 'Start by adding your first password'}
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Password
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}