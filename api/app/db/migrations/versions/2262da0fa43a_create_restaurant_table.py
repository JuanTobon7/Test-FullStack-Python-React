"""create restaurant table

Revision ID: 2262da0fa43a
Revises: 
Create Date: 2025-07-24 19:30:54.507529

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '2262da0fa43a'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('departments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('cities',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=250), nullable=False),
    sa.Column('department_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['department_id'], ['departments.id'], name='departments_fk'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('restaurants',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('name', sa.String(length=250), nullable=False),
    sa.Column('address', sa.String(length=250), nullable=False),
    sa.Column('city_id', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(length=250), nullable=False),
    sa.ForeignKeyConstraint(['city_id'], ['cities.id'], name='fk_restaurant_city'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('historic_reserval',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('table', sa.String(length=2), nullable=True),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('restaurant_id', sa.UUID(), nullable=False),
    sa.ForeignKeyConstraint(['restaurant_id'], ['restaurants.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('historic_reserval')
    op.drop_table('restaurants')
    op.drop_table('cities')
    op.drop_table('departments')
    # ### end Alembic commands ###
