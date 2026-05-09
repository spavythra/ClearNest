-- Create families table
create table if not exists families (
  id uuid primary key default gen_random_uuid(),
  name varchar(255) not null,
  created_at timestamp with time zone default now(),
  created_by uuid references auth.users
);

-- Create family_members table
create table if not exists family_members (
  id uuid primary key default gen_random_uuid(),
  family_id uuid references families on delete cascade,
  user_id uuid references auth.users on delete cascade,
  role varchar(50) default 'member',
  joined_at timestamp with time zone default now(),
  unique(family_id, user_id)
);

-- Create streaks table
create table if not exists streaks (
  id uuid primary key default gen_random_uuid(),
  family_id uuid references families on delete cascade,
  name varchar(255) not null,
  description text,
  daily_reset_hour int default 0,
  created_by uuid references auth.users,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create streak_logs table
create table if not exists streak_logs (
  id uuid primary key default gen_random_uuid(),
  streak_id uuid references streaks on delete cascade,
  user_id uuid references auth.users on delete cascade,
  completed_at timestamp with time zone default now(),
  date date not null,
  unique(streak_id, user_id, date)
);

-- Create shopping_items table
create table if not exists shopping_items (
  id uuid primary key default gen_random_uuid(),
  family_id uuid references families on delete cascade,
  name varchar(255) not null,
  category varchar(100),
  quantity int default 1,
  unit varchar(50),
  is_completed boolean default false,
  is_sticky boolean default false,
  created_at timestamp with time zone default now(),
  completed_at timestamp with time zone
);

-- Create inventory_items table
create table if not exists inventory_items (
  id uuid primary key default gen_random_uuid(),
  family_id uuid references families on delete cascade,
  name varchar(255) not null,
  category varchar(100),
  quantity int not null,
  unit varchar(50),
  min_quantity int,
  expiry_date date,
  last_updated timestamp with time zone default now(),
  updated_by uuid references auth.users
);

-- Create reminders table
create table if not exists reminders (
  id uuid primary key default gen_random_uuid(),
  family_id uuid references families on delete cascade,
  title varchar(255) not null,
  description text,
  reminder_type varchar(50) default 'one-time',
  scheduled_at timestamp with time zone,
  frequency varchar(50),
  assigned_to uuid references auth.users,
  is_completed boolean default false,
  created_by uuid references auth.users,
  created_at timestamp with time zone default now()
);

-- Create projects table
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  family_id uuid references families on delete cascade,
  name varchar(255) not null,
  description text,
  status varchar(50) default 'planning',
  deadline date,
  created_by uuid references auth.users,
  created_at timestamp with time zone default now()
);

-- Create project_tasks table
create table if not exists project_tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects on delete cascade,
  title varchar(255) not null,
  description text,
  status varchar(50) default 'todo',
  assigned_to uuid references auth.users,
  due_date date,
  created_at timestamp with time zone default now()
);

-- Create indexes for better query performance
create index if not exists idx_families_created_by on families(created_by);
create index if not exists idx_family_members_user_id on family_members(user_id);
create index if not exists idx_family_members_family_id on family_members(family_id);
create index if not exists idx_streaks_family_id on streaks(family_id);
create index if not exists idx_streak_logs_user_id on streak_logs(user_id);
create index if not exists idx_streak_logs_date on streak_logs(date);
create index if not exists idx_shopping_items_family_id on shopping_items(family_id);
create index if not exists idx_inventory_items_family_id on inventory_items(family_id);
create index if not exists idx_reminders_family_id on reminders(family_id);
create index if not exists idx_reminders_assigned_to on reminders(assigned_to);
create index if not exists idx_projects_family_id on projects(family_id);
create index if not exists idx_project_tasks_project_id on project_tasks(project_id);

-- Enable Row Level Security (RLS) for all tables
alter table families enable row level security;
alter table family_members enable row level security;
alter table streaks enable row level security;
alter table streak_logs enable row level security;
alter table shopping_items enable row level security;
alter table inventory_items enable row level security;
alter table reminders enable row level security;
alter table projects enable row level security;
alter table project_tasks enable row level security;

-- Create RLS policies
-- Families: Users can only view families they belong to
create policy "Users can view their families" on families
  for select using (id in (
    select family_id from family_members where user_id = auth.uid()
  ));

create policy "Users can create families" on families
  for insert with check (created_by = auth.uid());

-- Family Members: Users can view members of their families
create policy "Users can view family members" on family_members
  for select using (family_id in (
    select family_id from family_members where user_id = auth.uid()
  ));

-- Streaks: Users can view/edit streaks in their families
create policy "Users can view streaks" on streaks
  for select using (family_id in (
    select family_id from family_members where user_id = auth.uid()
  ));

create policy "Users can create streaks" on streaks
  for insert with check (
    family_id in (select family_id from family_members where user_id = auth.uid())
    and created_by = auth.uid()
  );

-- Streak Logs
create policy "Users can view streak logs" on streak_logs
  for select using (streak_id in (
    select id from streaks where family_id in (
      select family_id from family_members where user_id = auth.uid()
    )
  ));

create policy "Users can create streak logs" on streak_logs
  for insert with check (user_id = auth.uid());

-- Shopping Items
create policy "Users can view shopping items" on shopping_items
  for select using (family_id in (
    select family_id from family_members where user_id = auth.uid()
  ));

create policy "Users can manage shopping items" on shopping_items
  for insert with check (
    family_id in (select family_id from family_members where user_id = auth.uid())
  );

-- Inventory Items
create policy "Users can view inventory" on inventory_items
  for select using (family_id in (
    select family_id from family_members where user_id = auth.uid()
  ));

create policy "Users can manage inventory" on inventory_items
  for insert with check (
    family_id in (select family_id from family_members where user_id = auth.uid())
  );

-- Reminders
create policy "Users can view reminders" on reminders
  for select using (
    family_id in (select family_id from family_members where user_id = auth.uid())
    or assigned_to = auth.uid()
  );

create policy "Users can create reminders" on reminders
  for insert with check (
    family_id in (select family_id from family_members where user_id = auth.uid())
    and created_by = auth.uid()
  );

-- Projects
create policy "Users can view projects" on projects
  for select using (family_id in (
    select family_id from family_members where user_id = auth.uid()
  ));

create policy "Users can create projects" on projects
  for insert with check (
    family_id in (select family_id from family_members where user_id = auth.uid())
    and created_by = auth.uid()
  );

-- Project Tasks
create policy "Users can view project tasks" on project_tasks
  for select using (project_id in (
    select id from projects where family_id in (
      select family_id from family_members where user_id = auth.uid()
    )
  ));
