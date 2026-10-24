import { addDays } from '@/lib/date'

export const categories = ['Home', 'Electronics', 'Vehicles', 'Personal', 'Work']

export const documentCategories = ['Receipt', 'Warranty', 'Manual', 'Registration', 'Other']

export const initialItems = [
  { id: 'dyson', name: 'Dyson Purifier Cool', category: 'Home', type: 'Home appliances', icon: 'wind', price: 32900, status: 'protected', note: 'Warranty ends in 214 days' },
  { id: 'aeron', name: 'Herman Miller Aeron', category: 'Work', type: 'Office furniture', icon: 'armchair', price: 78500, status: 'active', note: 'Next care in 32 days' },
  { id: 'muuto', name: 'Muuto Lounge Chair', category: 'Home', type: 'Furniture', icon: 'armchair', price: 21800, status: 'active', note: 'No action needed' },
  { id: 'sony', name: 'Sony A7C II', category: 'Electronics', type: 'Camera', icon: 'camera', price: 119990, status: 'expiring', note: 'Warranty ends in 12 days', dueInDays: 12, actionLabel: 'Review' },
  { id: 'honda', name: 'Honda City RS', category: 'Vehicles', type: 'Vehicle', icon: 'car', price: 1128000, status: 'action', note: 'Registration due in 10 days', dueInDays: 10, actionLabel: 'Prepare' },
  { id: 'breville', name: 'Breville Barista Pro', category: 'Home', type: 'Kitchen', icon: 'coffee', price: 54000, status: 'maintenance', note: 'Descale due in 18 days', dueInDays: 18, actionLabel: 'Schedule' },
  { id: 'macbook', name: 'MacBook Pro 14"', category: 'Work', type: 'Computer', icon: 'laptop', price: 129990, status: 'protected', note: 'AppleCare+ covers 211 more days' },
]

export const initialDocuments = [
  { id: 'd1', name: 'MacBook Pro receipt.pdf', itemId: 'macbook', category: 'Receipt', expires: null, size: '1.2 MB' },
  { id: 'd2', name: 'AppleCare+ coverage.pdf', itemId: 'macbook', category: 'Warranty', expires: addDays(211), size: '640 KB' },
  { id: 'd3', name: 'Honda registration.pdf', itemId: 'honda', category: 'Registration', expires: addDays(10), size: '320 KB' },
  { id: 'd4', name: 'Dyson user manual.pdf', itemId: 'dyson', category: 'Manual', expires: null, size: '4.8 MB' },
  { id: 'd5', name: 'Sony A7C II warranty.pdf', itemId: 'sony', category: 'Warranty', expires: addDays(12), size: '410 KB' },
]

export const triggerOptions = [
  { value: 'warranty', label: '30 days before a warranty expires' },
  { value: 'maintenance', label: 'When maintenance is completed' },
  { value: 'expense', label: 'When a new expense is added' },
  { value: 'overdue', label: 'When a reminder is overdue' },
]

export const actionOptions = [
  { value: 'reminder', label: 'Create a reminder' },
  { value: 'email', label: 'Send an email' },
  { value: 'timeline', label: 'Add a task to the timeline' },
  { value: 'receipt', label: 'Ask for category and receipt' },
]

export const initialRules = [
  { id: 'r1', name: 'Warranty guardian', when: '30 days before any warranty expires', then: 'Create a reminder and send an email', active: true },
  { id: 'r2', name: 'Maintenance rhythm', when: 'When a service interval is reached', then: 'Add a task to the timeline', active: true },
  { id: 'r3', name: 'Large expense check', when: 'When a new expense is over ₱25,000', then: 'Ask for category and receipt', active: false },
]

export const notifications = [
  { id: 'n1', title: 'Sony A7C II warranty ends soon', detail: '12 days left' },
  { id: 'n2', title: 'Honda City RS registration', detail: 'Due in 10 days' },
  { id: 'n3', title: 'Breville Barista Pro needs descaling', detail: 'Due in 18 days' },
]

/* TrueCost: 12 months, oldest first */
export const costSeries = {
  current: [9800, 11200, 12400, 15800, 14900, 16200, 18100, 17400, 15200, 16800, 15900, 18420],
  previous: [10400, 11800, 13900, 15100, 16400, 17800, 17200, 16100, 15800, 16500, 17400, 16900],
}
export const costShares = [
  { label: 'Vehicles', share: 0.39 },
  { label: 'Electronics', share: 0.27 },
  { label: 'Home', share: 0.2 },
  { label: 'Personal', share: 0.14 },
]
export const topCosts = [
  { name: 'Honda City RS', purchase: 1128000, added: 186420, change: 8.2 },
  { name: 'MacBook Pro 14"', purchase: 129990, added: 18480, change: 4.1 },
  { name: 'Sony A7C II', purchase: 119990, added: 9850, change: 2.4 },
]
export const spendingThisMonth = {
  total: 18420,
  change: -8.4,
  segments: [
    { label: 'Maintenance', amount: 8200, color: 'var(--chart-1)' },
    { label: 'Utilities', amount: 5480, color: 'var(--chart-2)' },
    { label: 'Purchases', amount: 4740, color: 'var(--chart-3)' },
  ],
}

/* LifeGraph */
export const graphNodes = [
  { id: 'macbook', type: 'item', label: 'MacBook Pro', short: 'MB', x: 400, y: 260, kicker: 'Computer', subtitle: 'MacBook Pro 14-inch, M3 Pro', valueLabel: 'Purchase value', value: '₱129,990' },
  { id: 'receipt', type: 'document', label: 'Receipt', short: 'PDF', x: 170, y: 130, kicker: 'Document', subtitle: 'Official purchase receipt', valueLabel: 'File', value: 'PDF, 1.2 MB' },
  { id: 'applecare', type: 'document', label: 'AppleCare+', short: 'PDF', x: 630, y: 120, kicker: 'Warranty', subtitle: 'Extended coverage', valueLabel: 'Covers', value: '211 more days' },
  { id: 'setup', type: 'item', label: 'Work setup', short: 'WS', x: 160, y: 390, kicker: 'Collection', subtitle: 'Desk, chair, and display', valueLabel: 'Items', value: '4 linked' },
  { id: 'battery', type: 'cost', label: 'Battery service', short: '₱', x: 650, y: 390, kicker: 'Expense', subtitle: 'Battery replacement', valueLabel: 'Amount', value: '₱8,500' },
  { id: 'coverage', type: 'alert', label: 'Coverage ends', short: '12d', x: 400, y: 460, kicker: 'Deadline', subtitle: 'Warranty on the Sony A7C II', valueLabel: 'Due in', value: '12 days' },
]
export const graphEdges = [
  ['macbook', 'receipt'], ['macbook', 'applecare'], ['macbook', 'setup'],
  ['macbook', 'battery'], ['macbook', 'coverage'], ['receipt', 'applecare'], ['battery', 'coverage'],
]
export const graphTypeLabels = { item: 'Items', document: 'Documents', cost: 'Costs', alert: 'Alerts' }
export const insights = [
  'The MacBook Pro has two linked documents and one repair expense. Its recorded lifetime cost is ₱138,490.',
  'Two warranties end within 30 days: the Sony A7C II and the one linked to your coverage deadline.',
  'Your Work setup has four items but only one receipt on file.',
]

export const lifeQuerySuggestions = [
  'Which warranties expire in the next 30 days?',
  'What items need attention this month?',
  'What did I spend on maintenance this year?',
  'Show everything related to my work setup',
]
